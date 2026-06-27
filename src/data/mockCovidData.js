import countryList from './countryList';

const START_DATE = new Date('2019-01-01T00:00:00Z');
const END_DATE = new Date('2020-12-31T00:00:00Z');
const SUMMARY_DATE = END_DATE.toISOString();

const LARGE_COUNTRIES = new Set([
  'united-states',
  'india',
  'brazil',
  'russia',
  'united-kingdom',
  'france',
  'italy',
  'spain',
  'germany',
  'china',
  'mexico',
  'turkey',
  'iran',
  'colombia',
  'argentina',
  'poland',
  'south-africa',
  'philippines',
  'peru',
  'indonesia',
]);

const timelineCache = new Map();

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) + 1;
}

function createSeededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function totalDaysInRange() {
  return Math.floor((END_DATE - START_DATE) / (1000 * 60 * 60 * 24)) + 1;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getCountryScale(slug, random) {
  if (LARGE_COUNTRIES.has(slug)) {
    return 800000 + Math.floor(random() * 4200000);
  }
  return 500 + Math.floor(random() * 180000);
}

function generateCountryTimeline(countryName, slug) {
  const random = createSeededRandom(hashString(slug));
  const totalDays = totalDaysInRange();
  const maxCases = getCountryScale(slug, random);
  const outbreakStart = Math.floor(365 + 45 + random() * 120);
  const peakDay = outbreakStart + Math.floor(40 + random() * 100);
  const deathRate = 0.012 + random() * 0.028;
  const recoveryRate = 0.55 + random() * 0.3;

  const data = [];
  let confirmed = 0;
  let deaths = 0;
  let recovered = 0;

  for (let day = 0; day < totalDays; day++) {
    if (day >= outbreakStart) {
      const span = Math.max(totalDays - outbreakStart, 1);
      const distFromPeak = Math.abs(day - peakDay) / span;
      const growthFactor = Math.max(0.05, 1.1 - distFromPeak * 1.4);
      const dailyNew = Math.floor(maxCases * 0.003 * growthFactor * (0.6 + random() * 0.8));

      confirmed += dailyNew;
      deaths += Math.floor(dailyNew * deathRate);
      recovered += Math.floor(dailyNew * recoveryRate);
      recovered = Math.min(recovered, Math.max(confirmed - deaths, 0));
    }

    data.push({
      Country: countryName,
      CountryCode: slug.slice(0, 2).toUpperCase(),
      Date: addDays(START_DATE, day).toISOString(),
      Confirmed: confirmed,
      Deaths: deaths,
      Recovered: recovered,
    });
  }

  return data;
}

function getCachedTimeline(countryName, slug) {
  if (!timelineCache.has(slug)) {
    timelineCache.set(slug, generateCountryTimeline(countryName, slug));
  }
  return timelineCache.get(slug);
}

function buildCountrySummary(countryName, slug) {
  const random = createSeededRandom(hashString(slug));
  const maxCases = getCountryScale(slug, random);
  const deathRate = 0.012 + random() * 0.028;
  const recoveryRate = 0.55 + random() * 0.3;
  const totalConfirmed = Math.floor(maxCases * (0.75 + random() * 0.25));
  const totalDeaths = Math.floor(totalConfirmed * deathRate);
  const totalRecovered = Math.min(
    Math.floor(totalConfirmed * recoveryRate),
    Math.max(totalConfirmed - totalDeaths, 0)
  );
  const newConfirmed = Math.floor(totalConfirmed * (0.005 + random() * 0.015));
  const newDeaths = Math.floor(newConfirmed * deathRate);
  const newRecovered = Math.floor(newConfirmed * recoveryRate);

  return {
    Country: countryName,
    CountryCode: slug.slice(0, 2).toUpperCase(),
    Slug: slug,
    NewConfirmed: newConfirmed,
    TotalConfirmed: totalConfirmed,
    NewDeaths: newDeaths,
    TotalDeaths: totalDeaths,
    NewRecovered: newRecovered,
    TotalRecovered: totalRecovered,
    Date: SUMMARY_DATE,
  };
}

function buildGlobalSummary(countries) {
  const totals = countries.reduce(
    (acc, country) => ({
      NewConfirmed: acc.NewConfirmed + country.NewConfirmed,
      TotalConfirmed: acc.TotalConfirmed + country.TotalConfirmed,
      NewDeaths: acc.NewDeaths + country.NewDeaths,
      TotalDeaths: acc.TotalDeaths + country.TotalDeaths,
      NewRecovered: acc.NewRecovered + country.NewRecovered,
      TotalRecovered: acc.TotalRecovered + country.TotalRecovered,
    }),
    {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0,
    }
  );

  return {
    ...totals,
    Date: SUMMARY_DATE,
  };
}

const countries = countryList.map(([countryName, slug]) => buildCountrySummary(countryName, slug));

const summaryResponse = {
  data: {
    Global: buildGlobalSummary(countries),
    Countries: countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed),
  },
};

const countryLookup = countryList.reduce((acc, [countryName, slug]) => {
  acc[slug] = countryName;
  return acc;
}, {});

export function getSummaryResponse() {
  return summaryResponse;
}

export function getCountryStatsResponse(slug) {
  const countryName = countryLookup[slug] || slug.replace(/-/g, ' ');
  return {
    data: getCachedTimeline(countryName, slug),
  };
}

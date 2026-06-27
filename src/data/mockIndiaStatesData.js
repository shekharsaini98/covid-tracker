import stateList from './stateList';

const LARGE_STATES = new Set([
  'Maharashtra',
  'Uttar Pradesh',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Kerala***',
  'West Bengal',
  'Andhra Pradesh',
  'Gujarat',
  'Rajasthan',
  'Madhya Pradesh',
  'Haryana',
  'Bihar',
  'Punjab',
  'Telangana',
  'Odisha',
  'Assam',
]);

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

function buildStateRecord(stateName, index) {
  const random = createSeededRandom(hashString(stateName.toLowerCase()));
  const scale = LARGE_STATES.has(stateName)
    ? 120000 + Math.floor(random() * 900000)
    : 800 + Math.floor(random() * 65000);

  const new_positive = scale;
  const new_death = Math.floor(new_positive * (0.008 + random() * 0.022));
  const new_cured = Math.floor(new_positive * (0.72 + random() * 0.22));
  const new_active = Math.max(new_positive - new_death - new_cured, 0);

  const dailyCases = Math.floor(50 + random() * 1200);
  const positive = Math.max(new_positive - dailyCases, 0);
  const death = Math.max(new_death - Math.floor(dailyCases * (0.008 + random() * 0.02)), 0);
  const cured = Math.max(new_cured - Math.floor(dailyCases * (0.65 + random() * 0.25)), 0);
  const active = Math.max(positive - death - cured, 0);

  return {
    sno: String(index + 1),
    state_name: stateName,
    state_code: String(10 + index),
    active,
    positive,
    cured,
    death,
    new_active,
    new_positive,
    new_death,
    new_cured,
  };
}

function buildTotalsRow(states) {
  const totals = states.reduce(
    (acc, state) => ({
      active: acc.active + state.active,
      positive: acc.positive + state.positive,
      cured: acc.cured + state.cured,
      death: acc.death + state.death,
      new_active: acc.new_active + state.new_active,
      new_positive: acc.new_positive + state.new_positive,
      new_death: acc.new_death + state.new_death,
      new_cured: acc.new_cured + state.new_cured,
    }),
    {
      active: 0,
      positive: 0,
      cured: 0,
      death: 0,
      new_active: 0,
      new_positive: 0,
      new_death: 0,
      new_cured: 0,
    }
  );

  return {
    sno: String(states.length + 1),
    state_name: 'Total',
    state_code: '99',
    ...totals,
  };
}

const statesData = stateList.map(([stateName], index) => buildStateRecord(stateName, index));
const indiaStatesResponse = {
  data: [...statesData, buildTotalsRow(statesData)],
};

export function getIndiaStatesResponse() {
  return indiaStatesResponse;
}

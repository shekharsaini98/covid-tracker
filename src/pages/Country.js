import {useParams} from 'react-router-dom'
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Container,Row,Col } from 'react-bootstrap';
import { fetchCountryStats } from "../Redux/index.js";
import moment from 'moment';
import Piechart from '../components/Piechart/Piechart.js';
import Barchar from '../components/Barchart/Barchar.js';
import SearchCountry from '../components/SearchCountry/SearchCountry.js';
import countryList from '../data/countryList.js';

function Country() {
    const {country} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchCountryStats(country))
      if (country !== undefined) {
        dispatch(fetchCountryStats(country))
      }
    }, [dispatch, country]);
    // pie
    const state = useSelector(state=>state.countryStats);
    const {countryStats:{data},countryStatsLoading} = state;
    let pieData;
    if(data!==undefined){
        const pielastData = data[data.length-1];
        const {Confirmed,Deaths,Recovered}= pielastData;
        pieData = {
            labels: [`Cases ${Confirmed}`, `Deaths ${Deaths}`, `Recovered ${Recovered}`],
            datasets: [
            {
                label: '# of Votes',
                data: [Confirmed,Deaths,Recovered],
                backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                ],
            },
            ],
        }
    }
    // Area
    let series;let options;
    if(data!==undefined){
        series= [
              {
                name: 'Covid Cases',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Confirmed])
              },
              {
                name: 'Deaths',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Deaths])
              },
              {
                name: 'Recovered',
                data: data.map((dt)=> [moment(dt.Date).valueOf(), dt.Recovered])
              }
            ];
            options = {
              chart: {
                type: 'area',
                height: 350,
                stacked: true,
                events: {
                  selection: function (chart, e) {
                    new Date(e.xaxis.min)
                  }
                },
              },
              colors: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              fill: {
                type: 'gradient',
                gradient: {
                  opacityFrom: 0.6,
                  opacityTo: 0.8,
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left'
              },
              xaxis: {
                type: 'datetime'
              },
            };
    }
  return <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p className="m-0 p-2 graphtitle text-left">COVID-19 Timeline in <span className='text-capitalize'><b>{country}</b></span></p>
          </Col>
          <Col xs={12} md={6}>
            <SearchCountry searchList={countryList} listType="country" />
          </Col>
        </Row>   
        <Row> 
          <Col xs={12}>
              <div className="graphWrapper">
                <p className='graphtitle'>Daily Covid Details</p>
                {
                  (countryStatsLoading)?
                  'Loading...':
                  <Barchar options={options} series={series} />
                }
              </div>
          </Col>
          <Col xs={12}>
              <div className="graphWrapper">
                <p className='graphtitle'>Complete Covid Details</p>
                <div className="countryStatsPieWrapper">
                  {
                    (countryStatsLoading)?
                    'Loading...':
                    <Piechart piedata={pieData} />
                  }
                  
                </div>
              </div>
          </Col>
        </Row>
      </Container>
  </div>;
}

export default Country;

import {useParams} from 'react-router-dom'
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Container,Row,Col } from 'react-bootstrap';
import { fetchStateStats } from "../Redux/index.js";
import Piechart from '../components/Piechart/Piechart.js';
import Chart from "react-apexcharts";
import SearchCountry from '../components/SearchCountry/SearchCountry.js';
import stateList from '../data/stateList.js';


function States() {
    const {city} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchStateStats())
      if (city !== undefined) {
        dispatch(fetchStateStats())
      }
    }, [dispatch]);
    // pie
    const state = useSelector(state=>state.stateStats);
    const {stateStats:{data},stateStatsLoading} = state;
    let pieData;
    let allStateVariable;
    if(data!==undefined){
        const pieDatafilter = data.filter((st)=>(st.state_name).toLowerCase() ===city);
        const {active,positive,cured,death,new_active,new_positive,new_death,new_cured}= pieDatafilter[0];
        allStateVariable = {active,positive,cured,death,new_active,new_positive,new_death,new_cured};
        pieData = {
            labels: [`Cases ${new_positive}`, `Deaths ${new_death}`, `Recovered ${new_cured}`],
            datasets: [
            {
                label: '# of Votes',
                data: [new_positive,new_death,new_cured],
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
        data.pop()
        const allCases = data.map((st)=>st.new_positive);
        const allDeaths = data.map((st)=>st.new_death);
        const allCured = data.map((st)=>st.new_cured);
        const allState = data.map((st)=>st.state_name);
        series=[{
              name: 'Cases',
              data: allCases
            }, {
              name: 'Deaths',
              data: allDeaths
            }, {
              name: 'Recovered',
              data: allCured
            },]
        options={
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                  show: true
                },
                zoom: {
                  enabled: true
                }
              },
              colors: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }],
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10
                },
              },
              xaxis: {
                type: 'State',
                categories: allState,
              },
              legend: {
                position: 'right',
                offsetY: 40
              },
              fill: {
                opacity: 1
              }
            }
    }
  return <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p className="m-0 p-2 graphtitle text-left">COVID-19 Timeline in <span className='text-capitalize'><b>{city}</b></span></p>
          </Col>
          <Col xs={12} md={6}>
            <SearchCountry searchList={stateList} listType="state" />
          </Col>
        </Row>   
        <Row> 
          <Col xs={12} md={4}>
              <div className="graphWrapper">
                <p className='graphtitle'>State Covid Details</p>
                <div className="countryStatsPieWrapper">
                  {
                    (stateStatsLoading)?
                    'Loading...':
                    <Piechart piedata={pieData} />
                  }
                </div>
              </div>
          </Col>
          <Col xs={12} md={8}>
              <div className="graphWrapper">
                <p className='graphtitle'>Complete Covid Details</p>
                <div className="countryStatsPieWrapper">
                  {
                    (stateStatsLoading)?
                    'Loading...':
                    <div className='stateTextDiv'>
                      <p className='yellow'>Total Active: {allStateVariable.new_active}</p>
                      <p className='blue'>Total Positive: {allStateVariable.new_positive}</p>
                      <p className='red'>Total Deaths: {allStateVariable.new_death}</p>
                      <p className='green'>Total Recovered: {allStateVariable.new_cured}</p>
                      <p className='yellow'>New Active: {(allStateVariable.active-allStateVariable.new_active)}</p>
                      <p className='blue'>New Positive: {allStateVariable.new_positive-allStateVariable.positive}</p>
                      <p className='red'>New Deaths: {allStateVariable.new_death-allStateVariable.death}</p>
                      <p className='green'>New Recovered: {allStateVariable.new_cured-allStateVariable.cured}</p>
                      <p className='blue'>Recovered Perc.: {((allStateVariable.new_cured/allStateVariable.new_positive)*100).toFixed(2)+'%'}</p>
                      <p className='red'>Death Perc.: {((allStateVariable.new_death/allStateVariable.new_positive)*100).toFixed(2)+'%'}</p>
                    </div>
                  }
                </div>
              </div>
          </Col>
          <Col xs={12} md={12}>
              <div className="graphWrapper">
                <p className='graphtitle'>Daily Covid Details</p>
                {
                  (stateStatsLoading)?
                  'Loading...':
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                  />
                }
              </div>
          </Col>
        </Row>
      </Container>
  </div>;
}

export default States;

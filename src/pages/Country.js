import {useParams} from 'react-router-dom'
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Container,Row,Col } from 'react-bootstrap';
import { fetchCountryStats } from "../Redux/index.js";
import Piechart from '../components/Piechart/Piechart.js';
import Barchar from '../components/Barchart/Barchar.js';
import SearchCountry from '../components/SearchCountry/SearchCountry.js';


function Country() {
    // const [countrydt,setCountryDt] = useState(null)
    const {country} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchCountryStats(country))
      if (country !== undefined) {
        dispatch(fetchCountryStats(country))
      }
    }, [dispatch, country]);
    
  return <div>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p className="m-0 p-2 graphtitle text-left">COVID-19 Timeline in <span className='text-capitalize'><b>{country}</b></span></p>
          </Col>
          <Col xs={12} md={6}>
            <SearchCountry />
          </Col>
        </Row>   
        <Row> 
          <Col xs={12}>
              <div className="graphWrapper">
                <p className='graphtitle'>Daily Covid Details</p>
                <Barchar />
              </div>
          </Col>
          <Col xs={12}>
              <div className="graphWrapper">
                <p className='graphtitle'>Complete Covid Details</p>
                <div className="countryStatsPieWrapper">
                  <Piechart />
                </div>
              </div>
          </Col>
        </Row>
      </Container>
  </div>;
}

export default Country;

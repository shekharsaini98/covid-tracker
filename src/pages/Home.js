import SummaryData from "../components/SummaryData/SummaryData";
import SummaryTable from "../components/SummaryTable/SummaryTable";
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { getSummary } from "../Redux/index.js";

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getSummary())
    }, [dispatch]);
    const state = useSelector(state=>state.summaryReducer);
    const {covidSummary,summaryLoading} = state;
  return <div>
      <div>
          <p className="m-0 p-2">COVID-19 CORONAVIRUS PANDEMIC</p>
      </div>
      {
          (summaryLoading)?
          <div>Loading...</div>:
          <>
            <SummaryData data={covidSummary.data.Global}/>
            <SummaryTable tabledata={covidSummary.data.Countries} />
          </>
      }
      
  </div>;
}

export default Home;

import { combineReducers } from "redux";
import summaryReducer from "./summary/summaryReducer";
import countryStatsReducer from "./CountryStats/CountryStatsReducer";

const rootReducer = combineReducers({
    summaryReducer,
    countryStats:countryStatsReducer,
})

export default rootReducer;
import { combineReducers } from "redux";
import summaryReducer from "./summary/summaryReducer";
import countryStatsReducer from "./CountryStats/CountryStatsReducer";
import stateStatsReducer from "./StatesDetails/StatesDetailsReducer";

const rootReducer = combineReducers({
    summaryReducer,
    countryStats:countryStatsReducer,
    stateStats:stateStatsReducer,
})

export default rootReducer;
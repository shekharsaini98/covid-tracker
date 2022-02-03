import { COUNTRY_STATS_SUCCESS,COUNTRY_STATS_REQUEST,COUNTRY_STATS_ERROR } from "./CountryStatsTypes";

const initialState = {
    countryStats: '',
    countryStatsLoading:true,
    countryStatsError:null

}
const countryStatsReducer = (state=initialState, action) =>{
    switch(action.type){
        case COUNTRY_STATS_REQUEST:{
            return {
                ...state,
                countryStatsLoading:true,
            }
        }
        case COUNTRY_STATS_SUCCESS:{
            return {
                ...state,
                countryStats: action.payload,
                countryStatsLoading:false,
                countryStatsError:null
            }
        }
        case COUNTRY_STATS_ERROR:{
            return {
                ...state,
                countryStatsLoading:false,
                countryStatsError:action.payload
            }
        }
        default: return state
    }
} 
export default countryStatsReducer;
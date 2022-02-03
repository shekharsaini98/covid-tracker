import {STATES_STATS_SUCCESS,
STATES_STATS_REQUEST,
STATES_STATS_ERROR} from './StatesDetailsTypes';
const initialState = {
    stateStats: '',
    stateStatsLoading:true,
    stateStatsError:null

}
const stateStatsReducer = (state=initialState, action) =>{
    switch(action.type){
        case STATES_STATS_REQUEST:{
            return {
                ...state,
                stateStatsLoading:true,
            }
        }
        case STATES_STATS_SUCCESS:{
            return {
                ...state,
                stateStats: action.payload,
                stateStatsLoading:false,
                stateStatsError:null
            }
        }
        case STATES_STATS_ERROR:{
            return {
                ...state,
                stateStatsLoading:false,
                stateStatsError:action.payload
            }
        }
        default: return state
    }
} 
export default stateStatsReducer;
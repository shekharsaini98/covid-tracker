import axios from 'axios';
import {STATES_STATS_SUCCESS,
STATES_STATS_REQUEST,
STATES_STATS_ERROR} from './StatesDetailsTypes';

const stateStatsRequest = ()=>{
    return {
        type:STATES_STATS_REQUEST
    }
}

const stateStatsSuccess = (statesstats)=>{
    return {
        type:STATES_STATS_SUCCESS,
        payload:statesstats
    }
}

const stateStatsError = (error)=>{
    return {
        type:STATES_STATS_ERROR,
        payload:error
    }
}
export const fetchStateStats = ()=>{
    return(dispatch)=>{
        dispatch(stateStatsRequest())
        axios.get(`https://www.mohfw.gov.in/data/datanew.json`).then(
            response => {
                dispatch(stateStatsSuccess(response))
            }
        ).catch(
            error => {
                dispatch(stateStatsError(error))
            }
        )
    }
}
import axios from 'axios';
import {COUNTRY_STATS_SUCCESS,COUNTRY_STATS_REQUEST,COUNTRY_STATS_ERROR} from './CountryStatsTypes';

const countryStatsRequest = ()=>{
    return {
        type:COUNTRY_STATS_REQUEST
    }
}

const countryStatsSuccess = (cntrystats)=>{
    return {
        type:COUNTRY_STATS_SUCCESS,
        payload:cntrystats
    }
}

const countryStatsError = (error)=>{
    return {
        type:COUNTRY_STATS_ERROR,
        payload:error
    }
}
export const fetchCountryStats = (country)=>{
    return(dispatch)=>{
        dispatch(countryStatsRequest())
        axios.get(`https://api.covid19api.com/total/country/${country}`).then(
            response => {
                dispatch(countryStatsSuccess(response))
            }
        ).catch(
            error => {
                dispatch(countryStatsError(error))
            }
        )
    }
}
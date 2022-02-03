import axios from 'axios';
import {GET_SUMMARY,GET_SUMMARY_REQUEST,GET_SUMMARY_ERROR} from './summaryTypes';

const summaryRequest = ()=>{
    return {
        type:GET_SUMMARY_REQUEST
    }
}

const summarySuccess = (summary)=>{
    return {
        type:GET_SUMMARY,
        payload:summary
    }
}

const summaryError = (error)=>{
    return {
        type:GET_SUMMARY_ERROR,
        payload:error
    }
}
export const getSummary = ()=>{
    return(dispatch)=>{
        dispatch(summaryRequest())
        axios.get('https://api.covid19api.com/summary').then(
            response => {
                dispatch(summarySuccess(response))
            }
        ).catch(
            error => {
                dispatch(summaryError(error))
            }
        )
    }
}
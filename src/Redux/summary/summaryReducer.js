import { GET_SUMMARY,GET_SUMMARY_REQUEST,GET_SUMMARY_ERROR } from "./summaryTypes";

const initialState = {
    covidSummary: '',
    summaryLoading:true,
    summaryError:null

}
const summaryReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_SUMMARY_REQUEST:{
            return {
                ...state,
                summaryLoading:true,
            }
        }
        case GET_SUMMARY:{
            return {
                ...state,
                covidSummary:action.payload,
                summaryLoading:false,
                summaryError:null
            }
        }
        case GET_SUMMARY_ERROR:{
            return {
                ...state,
                summaryLoading:false,
                summaryError:action.payload
            }
        }
        default: return state
    }
} 
export default summaryReducer;
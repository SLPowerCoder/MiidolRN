/**
 * created by sunlei on 17/02/26
 */

import * as types from '../actions/ActionType'

const initialState = {
    starList: [],
    isLoading: true,
    isRefreshing: false,
}

let StarSubjectReducer = (state = initialState, action) => {

    switch(action.type){
        case types.FETCH_STAR_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_STAR_LIST:

            return Object.assign({},state,{
                starList:action.starList,
                isRefreshing: action.isRefreshing,
                isLoading:action.isLoading
            })
        default:
            return state;
    }
}

export default StarSubjectReducer;
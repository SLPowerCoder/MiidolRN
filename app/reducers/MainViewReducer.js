/**
 * created by sunlei on 17/02/26
 */

import * as types from '../actions/ActionType'

const initialState = {
    homeAdvPicsList: [],
    feedList:[],
    isRefreshing:false,
    isLoading:true,
}

let MainViewReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_MAIN_LIST:
            return {
                ...state,
            }
         case types.RECEIVE_MAIN_LIST:
            return Object.assign({}, state, {
                homeAdvPicsList: action.homeAdvPicsList,
                feedList:action.feedList,
                isRefreshing: action.isRefreshing,
                isLoading:action.isLoading
            })

        default:
            return state;
    }
}

export default MainViewReducer;
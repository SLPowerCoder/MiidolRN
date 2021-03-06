/**
 * created by sunlei on 17/02/26
 */

import * as types from '../actions/ActionType'

const initialState = {
    homeAdvPicsList: [],
    feedList:[],
    starList:[],
    isRefreshing:false,
    isLoading:true,
}

let MainViewReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FETCH_MAIN_LIST:
        case types.FETCH_STAR_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_MAIN_LIST:
            return Object.assign({}, state, {
                homeAdvPicsList: action.homeAdvPicsList,
                feedList:action.feedList,
                isRefreshing: action.isRefreshing,
                isLoading:action.isLoading
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

export default MainViewReducer;
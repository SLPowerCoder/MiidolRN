/**
 * created by sunlei on 17/02/26
 */

import * as types from '../actions/ActionType'

const initialState = {
    bannerList: [],
    feedList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
}

let MainViewReducer = (state = initialState, action) => {

    switch(action.type){
        case types.FETCH_BRAND_LIST:

            return {
                ...state,
            }
         case types.RECEIVE_BANNER_LIST:
            return Object.assign({}, state, {
                bannerList: action.bannerList,
            })
        case types.FETCH_FEED_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            })
        case types.RECEIVE_FEED_LIST:
            return Object.assign({}, state, {
                feedList: state.isLoadMore ? state.feedList.concat(action.feedList) : action.feedList,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default MainViewReducer;
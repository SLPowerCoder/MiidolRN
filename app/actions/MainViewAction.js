/**
 * Created by sunlei on 17/01/03.
 */

import * as types from './ActionType';
import Util from '../common/NetUtil';
import Constants from '../common/constants';

// 请求主页数据
export let mainViewAction = (isRefreshing,isLoading) => {
    let url = Constants.urlSet.main;
    // console.log('~~~~~~~~'+url)
    return dispatch => {

        dispatch(fetchMainList(isRefreshing,isLoading));

        return Util.get(url, {},(jsonData) => {    
            console.log('请求首页数据')
            let homeAdvPicsList = jsonData.data.homeAdvPics;
            let feedList = jsonData.data.list;
            dispatch(receiveMainList(homeAdvPicsList,feedList,false,false));

        }, (error) => {
            console.log('请求首页数据error==>' + error);
            // debugger
            dispatch(receiveMainList([],[],false,false));
        });
    }
}

let fetchMainList = (isRefreshing,isLoading) => {
    return {
        type: types.FETCH_MAIN_LIST,
        isRefreshing: isRefreshing,
        isLoading: isLoading
    }
}

let receiveMainList = (homeAdvPicsList,feedList,isRefreshing,isLoading) => {
    return {
        type: types.RECEIVE_MAIN_LIST,
        homeAdvPicsList:homeAdvPicsList,
        feedList:feedList,
        isRefreshing: isRefreshing,
        isLoading:isLoading
    }
}

// 请求明星列表数据
export let starSubjectAction = (isRefreshing,isLoading) => {
    let url = Constants.urlSet.starList;
    // console.log('~~~~~~~~'+url)
    return dispatch => {

        dispatch(fetchMainList(isRefreshing,isLoading));

        return Util.get(url, {},(jsonData) => {    
            console.log('请求明星列表数据')
            let starList = jsonData.data;
            dispatch(receiveStarSubjectList(starList,false,false));

        }, (error) => {
            console.log('请求明星列表数据error==>' + error);
            // debugger
            dispatch(receiveStarSubjectList([],false,false));
        });
    }
}

let fetchStarSubjectList = (isRefreshing,isLoading) => {
    return {
        type: types.FETCH_STAR_LIST,
        isRefreshing: isRefreshing,
        isLoading: isLoading
    }
}

let receiveStarSubjectList = (starList,isRefreshing,isLoading) => {
    
    return {
        type: types.RECEIVE_STAR_LIST,
        starList:starList,
        isRefreshing: isRefreshing,
        isLoading:isLoading
    }
}
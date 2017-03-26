/**
 * Created by sunlei on 17/01/03.
 */

import * as types from './ActionType';
import Util from '../common/NetUtil';
import Common from '../common/constants';

export let mainViewAction = (isRefreshing,isLoading) => {
    let url = 'http://appapi.miidol.com:85/api.php?m=videos&c=index&a=homeData';
    // console.log('~~~~~~~~'+url)
    return dispatch => {

        dispatch(fetchMainList(isRefreshing,isLoading));

        return Util.get(url, {},(jsonData) => {    
            console.log('请求首页数据')
            let homeAdvPicsList = jsonData.data.homeAdvPics;
            let feedList = jsonData.data.list;
            dispatch(receiveMainList(homeAdvPicsList,feedList,false,false));

        }, (error) => {
            console.log('加载首页数据error==>' + error);
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


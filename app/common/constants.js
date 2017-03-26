/**
 * Created by sunlei on 17/01/03.
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: '#ee753c',
}

let storeKeys = {
    SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
}

//程序中的URL合集
let urlSet = {
    // 首页
    Main            :'http://appapi.miidol.com:85/api.php?m=videos&c=index&a=homeData', 
    //获取频道列表
    ChannelTitleList: 'http://appapi.miidol.com:85/api.php?m=catas&c=index&a=getCata'
}

export default {
    window,
    colors,
    storeKeys,
    urlSet,
}
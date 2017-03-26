 /**
 * Created by sunlei on 17/01/22.
 */
import React from 'react';
import {
    StyleSheet,
    InteractionManager,
    TouchableHighlight,
    View,
    Text,
    Image,
    Switch,
    TouchableOpacity,
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

import Constant from '../../common/constants'
import NetUtil from '../../common/NetUtil'

//获取频道列表数据
const urlStr = 'http://appapi.miidol.com:85/api.php?m=catas&c=index&a=getCata'

export default class VideoListDetailCell3 extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tabList:[],
        }
    }  

    render() {

        return (
            <View style={styles.container}>
               <View style={styles.contentContainer}>
                    <Image style={styles.img} source={require('../../images/placeholder_img.png')} />
                    <View style={styles.textContainer}>  
                        <Text style={styles.text}>{'Lost stars 4k在线体验'}</Text>
                        <Text style={styles.text}>{'播放:191.0万'}</Text>
                    </View>
               </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        backgroundColor:'white',
        height:100,
    },
    contentContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:0.3,
        backgroundColor:'black'
    },
    img:{
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        height:80,
        width:120,
        resizeMode:'cover',
    },
    textContainer:{
        marginLeft:10,
        justifyContent:'space-around'
    },
    text:{
        color:'grey'
    }
})
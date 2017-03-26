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

export default class VideoListDetailCell extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tabList:[],
        }
    }  

    render() {

        return (
            <View style={styles.cellContainer}>
                <View style={styles.content}>
                    <View style={{height:50,flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.headerImg} source={require('../../images/bunny.png')} />
                        <View style={{height:50,flexDirection:'column',marginLeft:10,paddingTop:5}}>
                            <Text style={{color:'grey',fontSize:14}}>{'枫叶'}</Text>
                            <Text style={{color:'grey',fontSize:13,marginTop:5}}>{'2分钟前'}</Text>
                        </View>
                    </View>
                    
                    <Text style={styles.textPart}>
                    {
                        '永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。'
                    }
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex:1,
        // flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'grey',
        // height:100,
        paddingBottom:0.3,
    },
    content:{
        backgroundColor:'black',
        flex:1,
        width:Constant.window.width,
    },
    headerImg:{
        height:40,
        width:40,
        backgroundColor:'white',
        resizeMode:'contain',
        borderWidth:1,
        borderColor:'purple',
        borderRadius:20,
        // marginTop:10,
        marginLeft:10,
    },
    textPart:{
        padding:5,
        paddingLeft:15,
        lineHeight:18,
        color:'grey',
        fontSize:14,
    }
})
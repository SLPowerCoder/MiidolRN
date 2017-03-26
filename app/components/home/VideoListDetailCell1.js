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

export default class VideoListDetailCell1 extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            display:false,
            isUp:false,            
        }
    }  

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.titlleLine}>
                            <Text style={{color: '#ffd600',}}>{'北京场《原动力》'}</Text>
                            <TouchableOpacity onPress={()=>{
                                console.log('折叠按钮被点了')
                                this.setState({
                                    display:!this.state.display,
                                    isUp:!this.state.isUp,
                                })
                            }}
                            > 
                            <Image style={{width:15,height:15,resizeMode:'contain'}} source={this.state.isUp?require('../../images/expand_img_up.png'):require('../../images/expand_img.png')} />
                            </TouchableOpacity> 
                    </View>
                    {
                        !this.state.display ? null : 
                        <View style={{marginBottom:10}}>
                            <Text style={[styles.text,{textAlign:'right',paddingRight:5,fontSize:12}]}>{'播放:467.0万'}</Text>
                            <Text style={[styles.text,{color:'white'}]}>{'简介'}</Text>
                            <Text style={[styles.text,{fontSize:12,marginTop:5}]}>{'北京场 《原动力》'}</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'grey'
    },
    contentContainer:{
        backgroundColor:'black',
        marginBottom:.3,
    },
    titlleLine:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:15,
        marginRight:10,
    },
    text:{
        width:Constant.window.width,
        paddingLeft:15,
        color:'grey',
    }
})
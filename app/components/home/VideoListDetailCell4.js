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
    TextInput
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

import Constant from '../../common/constants'
import NetUtil from '../../common/NetUtil'

//获取频道列表数据
const urlStr = 'http://appapi.miidol.com:85/api.php?m=catas&c=index&a=getCata'

export default class VideoListDetailCell4 extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tabList:[],
            text: '',
        }
    }  

    render() {

        return (
            <View style={styles.container}>
               <View style={styles.contentContainer}>
                    <Text style={styles.title}>{'评论'}</Text>
                    <View style={styles.sendTextContainer}>
                        <Image style={styles.headerImg} source={require('../../images/bunny.png')}/>
                        <View style={styles.inputTextContainer}>
                            <TextInput
                                style={styles.inputText}
                                placeholder='说两句吧~' 
                                placeholderTextColor={'#ffd600'}
                                returnKeyType = 'send'
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(text) => this.setState({text})}
                                //该属性在单行的时候默认为true，多上的时候默认为false，只有它为true的时候
                                //点击键盘发送按钮blurOnSubmit才会被调用
                                blurOnSubmit={true}
                                onSubmitEditing={()=>{
                                    console.log('发送评论。。。。')
                                }}
                                // value={this.state.text}
                            />
                        </View>
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
        alignItems: 'center',
        backgroundColor:'white',
        height:90,
    },
    contentContainer:{  
        flex:1,
        width:Constant.window.width,
        backgroundColor:'black',
        marginBottom:0.5,
    },
    title:{
        color: '#ffd600',
        flex:1,
        fontSize:16,
        textAlign:'left',
        marginTop:10,
        marginLeft:10,
        // backgroundColor:'red'
    },
    sendTextContainer:{
        // backgroundColor:'yellow',
        flex:3,
        flexDirection:'row',        
        marginLeft:10,
        alignItems:'center',
    },
    headerImg:{
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:1,
        borderColor:'purple'
    },
    inputTextContainer:{
        // backgroundColor:'red',
        flex:1,
        flexDirection:'row',
        borderWidth: 0.3,
        borderColor: 'red', 
        marginRight:15,
        marginLeft:10,
    },
    inputText:{
        backgroundColor:'black',
        flex:1,
        alignSelf:'center',
        height:30,
        color:'white',
        margin:1,
    }
})
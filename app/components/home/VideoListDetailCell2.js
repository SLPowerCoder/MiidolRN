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

export default class VideoListDetailCell2 extends React.Component {
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
                    <View style={styles.titlleLine}>
                        <Text style={{color: '#ffd600',fontSize:14}}>{'真爱铁粉榜 >（实时更新）'}</Text>
                    </View>
                    <View style={styles.rank}>
                        <TouchableOpacity onPress={()=>{
                            console.log('折叠按钮被点了')
                            this.setState({
                                display:!this.state.display
                            })
                        }}
                            style={styles.rankItem}
                        > 
                            <Image style={styles.rankItemImg} source={require('../../images/椅子.png')} />
                            <Text style={styles.rankItemText}>{'真爱值:3045'}</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={()=>{
                            console.log('折叠按钮被点了')
                            this.setState({
                                display:!this.state.display
                            })
                        }}
                            style={styles.rankItem}                            
                        > 
                            <Image style={styles.rankItemImg} source={require('../../images/椅子.png')} />
                            <Text style={styles.rankItemText}>{'真爱值:3045'}</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={()=>{
                            console.log('折叠按钮被点了')
                            this.setState({
                                display:!this.state.display
                            })
                        }}
                            style={styles.rankItem}                            
                        > 
                            <Image style={styles.rankItemImg} source={require('../../images/椅子.png')} />
                            <Text style={styles.rankItemText}>{'真爱值:304'}</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        height:140,
    },
    contentContainer:{
        flex:1,
        backgroundColor:'black',
        marginBottom:0.5,
    },
    titlleLine:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:15,
        marginRight:10,
    },
    rank:{ //三个排行榜
        flexDirection:'row',
        justifyContent:'space-around'
    },
    rankItem:{
        backgroundColor:'black',
        alignItems:'center',
    },
    rankItemImg:{
        backgroundColor:'red',
        width:60,
        height:60,
        borderWidth:1,
        borderColor:'#ffd600',
        borderRadius:30,
        marginTop:6,
    },
    rankItemText:{
        color:'grey',
        fontSize:12,
        marginTop:7,
    },
})
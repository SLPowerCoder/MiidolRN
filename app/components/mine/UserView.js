/**
 * Created by sunlei on 17/01/03.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Switch,
    TouchableOpacity,
} from 'react-native';
import Common from '../../common/constants';

export default class UserView extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerImgContainer}>
                    <Image style={styles.headerImg} source={require('../../images/bunny.png')} />
                </View>
                
                <View style={styles.descContainer}>
                    <Text style={styles.desc}> 梦想成为全栈的开发工程师</Text>
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
        backgroundColor:'#ee753c'
    },
    headerImgContainer:{
        flex:2,
        backgroundColor:'green',
        width:Common.window.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg:{
        height:80,
        width:80,
        backgroundColor:'white',
        resizeMode:'contain',
        borderWidth:1,
        borderColor:'purple',
        borderRadius:40,
        marginTop:55,
    },
    descContainer:{
        flex:4,
    },
    desc:{
        fontSize:16,
        marginTop:50,
    },
})
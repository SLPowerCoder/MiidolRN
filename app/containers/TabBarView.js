/**
 * Created by sunlei on 17/01/03.
 */
import React from 'react';
import {
    StyleSheet,
    TabBarIOS,
    View,
    Text,
    Image,
} from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import MainContainer from './MainContainer'
import UserContainer from './UserContainer'
import Constants from '../common/constants';

import UserView from '../components/mine/UserView'
import VideoDetail from '../components/home/VideoListDetail'

var tabBarHeight = 49;
export default class TabBarView extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'MainContainer'
    //   selectedTab: 'VideoDetail'
     }
    }

    render() {
        
        return (
            <TabNavigator
                tabBarStyle={styles.tabBar}
                hidesTabTouch = {true}
                tabBarShadowStyle = {styles.tabBarShadowStyle}
                sceneStyle = {styles.sceneStyle}
            >
                <TabNavigator.Item
                    title='主页'
                    renderIcon={() => <Image source={require('../images/img_eye.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/img_eye.png')} />}
                    selected={this.state.selectedTab === 'MainContainer'}
                    onPress={() => {
                        this.setState({
                        selectedTab: 'MainContainer',
                        });
                    }}>
                    <MainContainer {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title='我的'
                    badgeText = '1'
                    renderIcon={() => <Image source={require('../images/img_eye.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/img_eye.png')} />}
                    selected={this.state.selectedTab === 'UserView'}
                    onPress={() => {
                        this.setState({
                        selectedTab: 'UserView',
                        });
                    }}>
                    <UserView {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
           
            /*
            <TabBarIOS  
                tintColor="#ffd600" 
                barTintColor = 'black'
                translucent = {false}
            >
                <Icon.TabBarItem
                    title='主页'
                    iconName='ios-list-outline'
                    selectedIconName='ios-list'
                    selected={this.state.selectedTab === 'MainView'}
                    onPress={() => {
                        this.setState({
                        selectedTab: 'MainView',
                        });
                    }}>
                    <MainView {...this.props}/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title='频道'
                    iconName='ios-videocam-outline'
                    selectedIconName='ios-videocam'
                    selected={this.state.selectedTab === 'ChannelView'}
                    onPress={() => {
                        this.setState({
                        selectedTab: 'ChannelView',
                        });
                    }}>
                    <ChannelView {...this.props}/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title='我的'
                    iconName='ios-more-outline'
                    selectedIconName='ios-more'
                    selected={this.state.selectedTab === 'UserView'}
                    onPress={() => {
                        this.setState({
                        selectedTab: 'UserView',
                        });
                    }}>
                    <UserView {...this.props}/>
                </Icon.TabBarItem>

            </TabBarIOS>
            */

        )
    }
}


const styles = StyleSheet.create({
    tabBar: {
        height: tabBarHeight,
        backgroundColor: 'black',
        alignItems: 'center',
        overflow: 'hidden'
    },
    tabBarShadowStyle:{
    },
    sceneStyle:{
        flex:1,
        paddingBottom: tabBarHeight, 
    },
    tabBarImg:{
        height:30,
        width:30,
    },
})
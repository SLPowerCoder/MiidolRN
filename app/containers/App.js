/**
 * Created by sunlei on 17/01/03.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Navigator,
  StatusBar
} from 'react-native';


import Icon  from 'react-native-vector-icons/Ionicons';
import TabBarView from '../containers/TabBarView';


var NavigationBarRouteMapper = {

  LeftButton: (route, navigator, index, navState) => {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Icon
            name='ios-arrow-back'
            size = {28}
            color = 'gray'
            backgroundColor = 'black'
            style = {styles.backIcon}
        />
        {/** 
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
        */}
        
      </TouchableOpacity>
    );
  },

  RightButton: (route, navigator, index, navState) => {

    var previousRoute = navState.routeStack[index + 1];

    return (
      <TouchableOpacity
        // onPress={() => navigator.push(previousRoute)}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {/*编辑*/}
        </Text>
      </TouchableOpacity>
    );
  },

  Title: (route, navigator, index, navState) => {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
};


export default class App extends Component {
    render() {

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={{title: '首页', component: TabBarView}}
                    configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    }}
                    //导航栏
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper}
                            style={styles.navBar}
                        />
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
  navBar: {
    backgroundColor: 'black',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#ffd600',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    flexDirection:'row',
    paddingLeft: 20,
  },
  backIcon:{
      marginVertical: 3.5,
      marginRight: 6,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#ffd600',
  }
});


/**
 * Created by sunlei on 17/01/03.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';
import Constants from '../common/constants';

export default class StatusBarIOS extends React.Component {
    render() {
        return (
            <View>
                <StatusBar {...this.props}/>
                <View style={styles.statusBar} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        flex: 1,
        height: 20,
        width:375,
        backgroundColor: 'black',
    }
})
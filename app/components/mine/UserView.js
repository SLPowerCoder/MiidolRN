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
    }
})
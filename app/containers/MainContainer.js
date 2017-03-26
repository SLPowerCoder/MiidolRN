/**
 * Created by sunlei on 17/03/23.
 */
import React from 'react';
import {connect} from 'react-redux';
import MainView from '../components/home/MainView';

class MainContainer extends React.Component {
    render() {
        return (
            <MainView {...this.props} />
        )
    }
}

//返回一个容器组件MainContainer
export default connect((state) => {
    const { MainViewReducer } = state;
    // console.log('MainContainer  connect',MainViewReducer);
    return {
        MainViewReducer
    }
})(MainContainer);
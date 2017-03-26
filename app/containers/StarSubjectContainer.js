/**
 * Created by sunlei on 17/03/23.
 */
import React from 'react';
import {connect} from 'react-redux';
import StarSubjectGrid from '../components/home/StarSubjectGrid';

class StarSubjectGridContainer extends React.Component {
    render() {
        return (
            <StarSubjectGrid {...this.props} />
        )
    }
}

//返回一个容器组件MainContainer
export default connect((state) => {
    const { StarSubjectReducer } = state;
    return {
        StarSubjectReducer
    }
})(StarSubjectGridContainer);
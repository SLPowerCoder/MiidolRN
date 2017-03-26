/**
 * Created by sunlei on 17/01/03.
 */
import React from 'react';
import {connect} from 'react-redux';
import User from '../components/mine/UserView';

class UserContainer extends React.Component {
    render() {
        return (
            <User {...this.props} />
        )
    }
}

export default connect((state) => {
    const {User} = state;
    return {
        User
    }
})(UserContainer);
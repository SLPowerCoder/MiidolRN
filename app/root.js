/**
 * Created by sunlei on 17/01/03.
 */
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './containers/App';

export default class Root extends React.Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}
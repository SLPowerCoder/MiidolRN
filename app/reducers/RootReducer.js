/**
 * Created by sunlei on 17/01/03.
 * 根reducer
 */
import { combineReducers } from 'redux';

import MainViewReducer from './MainViewReducer'
import ChannelReducer from './ChannelReducer'
import UserReducer from './UserReducer';

export default rootReducer = combineReducers({
    MainViewReducer,
    // ChannelReducer,
    // UserReducer,
})
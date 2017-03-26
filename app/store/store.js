/**
 * Created by sunlei on 17/01/03.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
// let state = store.getState();
// alert(state.Search.searchText)
export default store;
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import{getItems} from '../actions/itemAction'
export default combineReducers({
  itemReducer:itemReducer
})

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import items from "./items";
import focus from './focus'
import is from './is'

export default combineReducers({
  routing: routerReducer,
  focus,
  is,
  items,
});

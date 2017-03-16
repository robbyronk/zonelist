import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import items from "./items";
import focus from './focus'

export default combineReducers({
  routing: routerReducer,
  focus,
  items,
});

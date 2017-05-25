import {combineReducers} from "redux";
import items from "./items";
import focus from './focus'
import is from './is'

export default combineReducers({
  focus,
  is,
  items,
});

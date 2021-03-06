import {combineReducers} from "redux";
import items from "./items";
import focus from './focus'
import is from './is'
import view from './view'
import outline from './outline'
import session from "./session";
import dnd from "./dnd";

export default combineReducers({
  focus,
  is,
  items,
  outline,
  session,
  view,
  dnd,
});

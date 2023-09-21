import { combineReducers } from "redux";
import SingleContactItemReducer from "./Reducers/SingleContactItemReducer";

const rootReducer = combineReducers({
  singleContactItemReducer: SingleContactItemReducer,
});

export default rootReducer;

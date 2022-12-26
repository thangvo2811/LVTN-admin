import ThemeReducer from "./ThemeReducer";
import { combineReducers } from "redux";
import adminReducer from "./adminLogin";

const rootReducer = combineReducers({ ThemeReducer, admin: adminReducer });

export default rootReducer;

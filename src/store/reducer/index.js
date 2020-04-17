// 1 引入 合并reducer的对象
import { combineReducers } from "redux";
import mapReducer from "./mapReducer";
// 2 对象的形式传入 要合并的reducer
const rootReducer = combineReducers({ mapReducer });

export default rootReducer;

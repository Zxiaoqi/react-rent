import { createStore,applyMiddleware } from "redux";
import reducer from "./reducer";
import readuxThunk from "redux-thunk";

export default createStore(reducer, applyMiddleware(readuxThunk));

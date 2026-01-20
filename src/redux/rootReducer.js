import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import financeReducer from "./reducers/financeReducer";
import assetReducer from "./reducers/assetReducer";

const rootReducer = combineReducers({
  user: userReducer,
  finance: financeReducer,
  assets: assetReducer, 
});

export default rootReducer;

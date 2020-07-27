import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./user/reducer";

const middlewares = [thunkMiddleware];

export default function configStore() {
  const store = createStore(userReducer, applyMiddleware(...middlewares));
  return store;
}

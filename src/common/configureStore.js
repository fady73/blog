import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import reducers from "../reducers";
import * as Auth from "../actions/authAction";

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(promise, thunk));
  store.dispatch(Auth.verifyAuth());
  return store;
}

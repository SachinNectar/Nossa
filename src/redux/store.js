import { createStore, applyMiddleware, combineReducers } from "redux";
import { modelReducer, formReducer } from "./reducers/index";

const reducers = combineReducers({
  models: modelReducer,
  forms: formReducer,
});

// if (isDebug) {
//   middlewares.push(logger);
// }

// let store = isDebug
//   ? createStore(
//       reducers,
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__(),
//       applyMiddleware(...middlewares)
//     )
//   : createStore(reducers, applyMiddleware(...middlewares));

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

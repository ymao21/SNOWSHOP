import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import reviewsReducer from "./reviews";
import cartReducer from "./cart";
import searchReducer from "./search";

const rootReducer = combineReducers({
  session: sessionReducer,
  productState: productsReducer,
  reviewState: reviewsReducer,
  cartState: cartReducer,
  searchState: searchReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

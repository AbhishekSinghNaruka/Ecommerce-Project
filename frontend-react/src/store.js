import {combineReducers, createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer,productDetailReducer} from './reducers/productReducers';
import {authReducer,userReducer,forgotPasswordReducer} from './reducers/authReducers';

const reducer = combineReducers({
  product:productReducer,
  productDetails:productDetailReducer,
  auth:authReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer
});

let initialState= [];

const middleware = [thunk];
const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

import { combineReducers } from 'redux';
// Customer Reducer
import userReducer from './auth/reducers';
import homeReducer from './home/reducers';
import loanReducer from './loan/reducers';

export default combineReducers({
  userRoot: userReducer,
  homeRoot: homeReducer,
  loanRoot: loanReducer
})
import { combineReducers } from 'redux';
import experimentsReducer from './experimentsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  experiments: experimentsReducer,
  modal: modalReducer,
});

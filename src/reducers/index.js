import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import isLoading from './loading';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  users,
  questions,
  isLoading,
  loadingBar: loadingBarReducer
});
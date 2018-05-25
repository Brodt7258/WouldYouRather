import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';
import { setLoaded } from './loading';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveVote } from '../utils/api';

import { CAST_VOTE } from './types';

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(null));
      dispatch(setLoaded());
      dispatch(hideLoading());
    });
};

export const castVote = ({ authedUser, qid, answer }) => {
  return {
    type: CAST_VOTE,
    authedUser,
    qid,
    answer
  };
};

export const handleCastVote = ({ qid, answer }) => (dispatch, getState) => {
  const { authedUser } = getState();

  dispatch(showLoading());

  return saveVote({
    authedUser,
    qid,
    answer
  })
    .then(dispatch(castVote({ authedUser, qid, answer })))
    .then(() => dispatch(hideLoading()));
};
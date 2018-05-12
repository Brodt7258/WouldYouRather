import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveVote } from '../utils/api';

export const CAST_VOTE = 'CAST_VOTE';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());
  return getInitialData()
    .then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
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
import { RECEIVE_USERS } from '../actions/users';
import { CAST_VOTE } from '../actions/shared';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case CAST_VOTE:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser] : {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    default:
      return state;
  };
};
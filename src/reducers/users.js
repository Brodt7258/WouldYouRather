import { RECEIVE_USERS, CREATE_USER } from '../actions/users';
import { CAST_VOTE } from '../actions/shared';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case CREATE_USER:
      const { user } = action
      return {
        ...state,
        [user.id]: user
        }
    case CAST_VOTE:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    default:
      return state;
  }
};
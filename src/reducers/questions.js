import { RECEIVE_QUESTIONS, ADD_QUESTION } from '../actions/questions';
import { CAST_VOTE } from '../actions/shared';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { 
        ...state,
        ...action.questions 
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: {
          ...question
        }
      };
    case CAST_VOTE:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser]
          }
        }
      };
    default:
      return state;
  }
}
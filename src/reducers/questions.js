import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_COMMENT, TOGGLE_LIKE } from '../actions/questions';
import { CAST_VOTE } from '../actions/shared';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS: {
      return { 
        ...state,
        ...action.questions 
      };
    }
    case ADD_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.id]: {
          ...question
        }
      };
    }
    case CAST_VOTE: {
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
    }
    case ADD_COMMENT: {
      const { qid, comment } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          comments: {
            ...state[qid].comments,
            [comment.id] : {
              ...comment
            }
          }
        }
      };
    }
    case TOGGLE_LIKE: {
      const { qid, authedUser, hasLiked } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          likes: hasLiked //kind of hacky, but not a feature the data was intended to support.
            ? state[qid].likes.filter(uid => uid !== authedUser)
            : state[qid].likes
              ? state[qid].likes.concat([authedUser])
              : [authedUser]
        }
      };
    }
    default:
      return state;
  }
}
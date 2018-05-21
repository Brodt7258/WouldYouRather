import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_COMMENT = 'ADD_COMMENT';


export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  };
};

export const handleAddQuestion = ({ optionOne, optionTwo }) => (dispatch, getState) => {
  const { authedUser } = getState();

  dispatch(showLoading());

  return saveQuestion({
    author: authedUser,
    optionOneText: optionOne,
    optionTwoText: optionTwo
  })
    .then(question => dispatch(addQuestion(question)))
    .then(question => {
      dispatch(hideLoading())
      return question;
    });
};

export const addComment = (qid, comment) => {
  return {
    type: ADD_COMMENT,
    qid,
    comment
  }
}
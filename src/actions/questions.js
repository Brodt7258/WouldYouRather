import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_COMMENT, TOGGLE_LIKE } from './types';

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
  };
};

export const toggleLike = ({ qid, hasLiked, authedUser }) => {
  return {
    type: TOGGLE_LIKE,
    qid,
    hasLiked,
    authedUser
  };
};
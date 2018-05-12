import { _getUsers, _getQuestions, _saveQuestion } from './_DATA.js';

export const getInitialData = () => {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
};

export const saveQuestion = (question) => {
  return _saveQuestion(question);
};
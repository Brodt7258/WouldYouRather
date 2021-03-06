import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './data.js';

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

export const saveVote = (vote) => {
  return _saveQuestionAnswer(vote);
}
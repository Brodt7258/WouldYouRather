import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleCastVote } from '../actions/shared';
import NotFound from './NotFound';

class QuestionDetails extends Component {
  handleVote = answer => {
    const { id, dispatch } = this.props;

    dispatch(handleCastVote({
      qid: id,
      answer
    }));
  };

  render() {
    const { answered = false, id, question: { optionOne, optionTwo } = {}, author = '', notFound } = this.props;

    if (notFound) {
      return (
        <NotFound />
      );
    }

    return (
      <div>
        <div>QuestionDetails</div>
        <div>{`${answered}`}</div>
        <div>{id}</div>
        <div>{author.name}</div>
        <div>1 {optionOne.text}</div>
        <div>2 {optionTwo.text}</div>
        {
          !answered &&
          <div>
            <button onClick={() => this.handleVote('optionOne')}>
              1
            </button>
            <button onClick={() => this.handleVote('optionTwo')}>
              2
            </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
  const { id } = props.match.params;
  console.log(!!questions[id]);

  if (questions[id]) {
    return {
      id,
      answered: questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser),
      question: questions[id],
      author: users[questions[id].author]
    };
  } else {
    return {
      id,
      notFound: true
    }
  }
  
};

export default connect(mapStateToProps)(QuestionDetails);
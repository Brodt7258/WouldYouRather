import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionDetails extends Component {
  render() {
    const { answered, id, question, author } = this.props;

    return (
      <div>
        <div>QuestionDetails</div>
        <div>{`${answered}`}</div>
        <div>{id}</div>
        <div>{author.name}</div>
        <div>{question.optionOne.text}</div>
        <div>{question.optionTwo.text}</div>
      </div>
    );
  }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
  const { id } = props.match.params;

  return {
    id,
    answered: questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser),
    question: questions[id],
    author: users[questions[id].author]
  };
};

export default connect(mapStateToProps)(QuestionDetails);
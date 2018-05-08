import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { id, question: { optionOne, optionTwo } } = this.props;

    return (
      <div className="center">
        <h5>Question {id}</h5>
        <p>{optionOne.text}</p>
        <p>{optionTwo.text}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }, { id }) => {
  return {
    question: questions[id]
  };
};

export default connect(mapStateToProps)(Question);
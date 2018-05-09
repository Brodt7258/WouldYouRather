import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div className="tile is-ancestor is-vertical">
        <h3 className="center">QuestionList {this.props.type}</h3>
        {
          questions
            ? questions.map(q => <Question key={q} id={q} />)
            : <div className="center">No questions yet</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions }, { type }) => {
  switch (type) {
    case 'new':
      return {
        authedUser,
        questions: questions
          ? Object.values(questions)
            .filter(q => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(q => q.id)
          : []
      };
    case 'answered':
      return {
        authedUser,
        questions: questions 
          ? Object.values(questions)
            .filter(q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(q => q.id)
          : []
      };
    default:
      console.log(`${type} is not a valid type for QuestionList`);
  }
};

export default connect(mapStateToProps)(QuestionList);
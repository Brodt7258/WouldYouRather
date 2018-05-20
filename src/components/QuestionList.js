import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        {
          questions
            ? questions.map(q => (
                <Question key={q} id={q} />
            ))
            : <div>No questions yet</div>
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
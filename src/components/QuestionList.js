import React, {Component} from 'react';
import { connect } from 'react-redux';

class QuestionList extends Component {
  render() {
    const { questions } = this.props;
    console.log(`${this.props.type}`, this.props);
    return (
      <div>
        <h3 className="center">QuestionList {this.props.type}</h3>
        {
          questions
            ? questions.map(q => <div className="center" key={q.id}>{q.id}</div>)
            : <div className="center">No questions yet</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions }, { type }) => {
  switch (type) {
    case 'unanswered':
      return {
        authedUser,
        questions: questions
          ? Object.values(questions).filter(q => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser))
          : []
      };
    case 'answered':
      return {
        authedUser,
        questions: questions 
          ? Object.values(questions).filter(q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)) 
          : []
      };
    default:
      console.log(`${type} is not a valid type for QuestionList`);
  }
};

export default connect(mapStateToProps)(QuestionList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import Button from 'material-ui-next/Button';
import { handleCastVote } from '../actions/shared';
import NotFound from './NotFound';
import Question from './Question';

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
      <Card style={{ marginTop: '20px', display: 'flex' }}>
        <Paper style={{ padding: '20px', flex: '1', backgroundColor: '#b0bec5' }}>
          <div>QuestionDetails</div>
          <div>{`${answered}`}</div>
          <div>{id}</div>
          <div>{author.name}</div>
        </Paper>
        <CardContent style={{ flex: '2' }}>
          {
            !answered &&
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 'auto', padding: '15px' }}>Would you rather...?</p>
              <Button style={{ flex: '1', padding: '20px' }} onClick={() => this.handleVote('optionOne')}>
                {optionOne.text}
              </Button>
              <Button style={{ flex: '1', padding: '20px' }} onClick={() => this.handleVote('optionTwo')}>
                {optionTwo.text}
              </Button>
            </div>
          }
          {
            answered &&
            <div>
              <div>
                Total Votes: {optionOne.votes.length + optionTwo.votes.length}
              </div>
              <div>
                Votes for One: {optionOne.votes.length}
              </div>
              <div>
                Votes for Two: {optionTwo.votes.length}
              </div>
            </div>
          }
        </CardContent>
      </Card>
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
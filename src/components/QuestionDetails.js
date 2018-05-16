import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import Button from 'material-ui-next/Button';
import moment from 'moment';
import { handleCastVote } from '../actions/shared';
import NotFound from './NotFound';
import UserAvatar from './UserAvatar';
import VoteChart from './VoteChart';

class QuestionDetails extends Component {
  handleVote = answer => {
    const { id, dispatch } = this.props;

    dispatch(handleCastVote({
      qid: id,
      answer
    }));
  };

  render() {
    const { answered = false, question: { optionOne, optionTwo, timestamp } = {}, author = '', notFound } = this.props;
    

    if (notFound) {
      return (
        <NotFound />
      );
    }

    const date = moment(timestamp).format('MMM Do, YYYY | h:mm a');

    return (
      <Card style={{ marginTop: '20px', display: 'flex' }}>
        <Paper style={{ padding: '20px', flex: '1', backgroundColor: '#b0bec5' }}>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <UserAvatar uID={author.id} style={{ margin: 'auto', marginBottom: 10 }} />
            <div >{author.name}</div>
            <div>{date}</div>
          </div>
          
        </Paper>
        <CardContent style={{ flex: '2' }}>
          {
            !answered &&
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 'auto', padding: '15px' }}>Would you Rather?</p>
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: 'auto', padding: '15px' }}>
                Total Votes: {optionOne.votes.length + optionTwo.votes.length}
              </p>
              <Paper style={{ flex: '1', padding: '20px' }}>
                Votes for One: {optionOne.votes.length}
              </Paper>
              <Paper style={{ flex: '1', padding: '20px' }}>
                Votes for Two: {optionTwo.votes.length}
              </Paper>
              <VoteChart
                style={{ flex: 1 }}
                optOneVotes={optionOne.votes.length}
                optTwoVotes={optionTwo.votes.length}
              />
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
  const { id } = props.match.params;

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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import moment from 'moment';
import UserAvatar from './UserAvatar';

class Question extends Component {
  render() {
    const { question: {optionOne, optionTwo, timestamp }, author } = this.props;
    const date = moment(timestamp).format('MMM Do, YYYY | h:mm a');

    return (
      <Card>
        <Paper style={{ display: 'flex', backgroundColor: '#b0bec5', padding: '10px' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <UserAvatar uID={author.id} />
            <div style={{ flex: '1', paddingLeft: '15px' }}>
              <div>{author.name}</div>
              <div>{date}</div>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div>Likes</div>
            <div>Comments</div>
          </div>
        </Paper>
        <CardContent>
          <p style={{ textAlign: 'center' }}>Would You Rather?</p>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ flex: 1, textAlign: 'center', marginRight: '10px' }}>
            <Paper style={{ minHeight: '3rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>
                {optionOne.text}
              </p>
            </Paper>
            </div>
            <div style={{ flex: 1, textAlign: 'center', marginLeft: '10px' }}>
            <Paper style={{ minHeight: '3rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>
                {optionTwo.text}
              </p>
            </Paper>
            </div>
          </div>
        </CardContent>
      </Card>  
    );
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  return {
    question: questions[id],
    author: users[questions[id].author]
  };
};

export default connect(mapStateToProps)(Question);
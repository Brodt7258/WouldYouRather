import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import moment from 'moment';
import Replies from 'react-icons/lib/md/reply';
import UserAvatar from './UserAvatar';

class Question extends Component {
  render() {
    const { question: { id, optionOne, optionTwo, timestamp }, author, comments } = this.props;
    const date = moment(timestamp).format('MMM Do, YYYY | h:mm a');

    return (
      <Link to={`/question/${id}`} style={{ margin: 20, textDecoration: 'none', color: 'black' }}>
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
              <div>
                {
                  comments &&
                  <div><Replies /> {comments}</div>
                }
              </div>
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
      </Link>
    );
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id];
  return {
    question,
    author: users[question.author],
    comments: question.comments
      ? Object.values(question.comments).length
      : false
  };
};

export default connect(mapStateToProps)(Question);
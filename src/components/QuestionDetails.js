import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import Button from 'material-ui-next/Button';
import moment from 'moment';
import Check from 'react-icons/lib/md/check';
import Reply from 'react-icons/lib/md/reply';
import Favorite from 'react-icons/lib/md/favorite';
import FavoriteOutline from 'react-icons/lib/md/favorite-outline';
import { handleCastVote } from '../actions/shared';
import { toggleLike } from '../actions/questions';
import NotFound from './NotFound';
import UserAvatar from './UserAvatar';
import VoteChart from './VoteChart';
import CommentForm from './CommentForm';
import Comments from './Comments';

class QuestionDetails extends Component {
  handleVote = answer => {
    const { id, dispatch } = this.props;

    dispatch(handleCastVote({
      qid: id,
      answer
    }));
  }

  handleLike = () => {
    const { authedUser, id, hasLiked, dispatch } = this.props;
    dispatch(toggleLike({ qid: id, hasLiked, authedUser }));
  }

  render() {
    const {
      answered = null,
      question: { optionOne, optionTwo, timestamp } = {},
      author = '',
      notFound,
      id,
      comments,
      likes,
      hasLiked,
      percentOne,
      percentTwo } = this.props;

    if (notFound) {
      return (
        <NotFound />
      );
    }

    const date = moment(timestamp).format('MMM Do, YYYY | h:mm a');

    return (
      <div>
        <Card style={{ marginTop: '20px', display: 'flex' }}>
          <Paper style={{ padding: '20px', flex: '1', backgroundColor: '#b0bec5', display: 'flex', flexDirection: 'column' }}>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <UserAvatar uID={author.id} style={{ margin: 'auto', marginBottom: 10 }} />
              <div >{author.name}</div>
              <div>{date}</div>
            </div>
            <div style={{ flex: '1' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div onClick={this.handleLike} style={{ gridColumn: '1', justifySelf: 'center' }}>
                {
                  hasLiked
                  ? <Favorite />
                  : <FavoriteOutline />
                }
                {likes > 0 && likes}
              </div>
              <div style={{ gridColumn: '2', justifySelf: 'center' }}>
              {
                comments &&
                <div>
                  <Reply /> {comments}
                </div>
              }
              </div>
            </div>
            
          </Paper>
          <CardContent style={{ flex: '2' }}>
            {
              !answered &&
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ margin: 'auto', padding: '15px' }}>Would you Rather?</p>
                <Button
                  variant="raised"
                  style={{
                    flex: '1',
                    padding: '20px',
                    margin: '1em',
                    background: 'linear-gradient(178deg, rgb(79,97,175) 0%, #FFF 25%, #FFF 75%, rgb(57,181,191) 100%)'
                  }}
                  onClick={() => this.handleVote('optionOne')}
                >
                  {optionOne.text}
                </Button>
                <Button
                  variant="raised"
                  style={{ 
                    flex: '1',
                    padding: '20px',
                    margin: '1em',
                    background: 'linear-gradient(178deg, rgb(254,146,69) 0%, #FFF 25%, #FFF 75%, rgb(226,55,139) 100%)'
                  }}
                  onClick={() => this.handleVote('optionTwo')}
                >
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
                <Paper 
                  style={{ 
                    flex: '1',
                    padding: '20px',
                    display: 'flex',
                    margin: '1em',
                    background: 'linear-gradient(178deg, rgb(79,97,175) 0%, #FFF 25%, #FFF 75%, rgb(57,181,191) 100%)'
                  }}
                >
                  <div style={{ flex: '3' }}>
                    {optionOne.text}:
                  </div>
                  <div style={{ flex: '1' }}>
                    {optionOne.votes.length} ({Math.round(percentOne * 100)}%)
                  </div>
                  <div style={{ flex: '1' }}>
                    {answered === 'optionOne' && <Check />}
                  </div>
                </Paper>
                <Paper 
                  style={{ 
                    flex: '1',
                    padding: '20px',
                    display: 'flex',
                    margin: '1em',
                    background: 'linear-gradient(178deg, rgb(254,146,69) 0%, #FFF 25%, #FFF 75%, rgb(226,55,139) 100%)'
                  }}
                >
                  <div style={{ flex: '3' }}>
                    {optionTwo.text}:
                  </div>
                  <div style={{ flex: '1' }}>
                    {optionTwo.votes.length} ({Math.round(percentTwo * 100)}%)
                  </div>
                  <div style={{ flex: '1' }}>
                    {answered === 'optionTwo' && <Check />}
                  </div>
                </Paper>
                <VoteChart
                  style={{ flex: 1, paddingRight: '30px' }} //this is a total hack, but react-vis doesn't want to play nice and center my chart properly
                  optOneVotes={optionOne.votes.length}
                  optTwoVotes={optionTwo.votes.length}
                />
              </div>
            }
          </CardContent>
        </Card>
        {
          answered &&
          <CommentForm qid={id} />
        }
        {
          comments &&
          <Comments qid={id} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({questions, users, authedUser}, props) => {
  const { id } = props.match.params;
  const question = questions[id];

  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const percentOne = question.optionOne.votes.length / totalVotes;
  const percentTwo = question.optionTwo.votes.length / totalVotes;

  if (question) {
    return {
      id,
      answered: question.optionOne.votes.includes(authedUser) 
        ? 'optionOne' 
        : question.optionTwo.votes.includes(authedUser) 
          ? 'optionTwo' 
          : null,
      question,
      author: users[question.author],
      comments: question.comments
        ? Object.keys(question.comments).length
        : false,
      likes: question.likes
        ? question.likes.length
        : 0,
      hasLiked: question.likes
        ? question.likes.includes(authedUser)
        : false,
      authedUser,
      percentOne,
      percentTwo
    };
  } else {
    return {
      id,
      notFound: true
    }
  }
  
};

export default connect(mapStateToProps)(QuestionDetails);
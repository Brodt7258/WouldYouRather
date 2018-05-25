import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import Card, { CardContent } from 'material-ui-next/Card';
import InputAdornment from 'material-ui-next/Input/InputAdornment';
import { addComment } from '../actions/questions';

class CommentForm extends Component {
  state = {
    text: ''
  }

  COMMENT_MAX = 140;

  handleChange = e => {
    if (e.target.value.length <= this.COMMENT_MAX) {
      this.setState({ text: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { qid, authedUser, addComment } = this.props;

    const timestamp = Date.now();
    const cid = qid + authedUser + timestamp; //I wouldn't do this for real, but I think it will be fine here.

    addComment(qid,  {
      id: cid,
      author: authedUser,
      text,
      timestamp
     });
     this.setState({ text: '' });
  }
  
  render() {
    const { text } = this.state;

    const WARN_SIZE = 40;
    const commentLeft = this.COMMENT_MAX - text.length;

    return (
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              placeholder="What do you think?"
              value={text}
              onChange={this.handleChange}
              multiline
              fullWidth
              rows={2}
              InputProps={{
                endAdornment: <InputAdornment position="end">{commentLeft <= WARN_SIZE ? commentLeft : ''}</InputAdornment>,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{ marginTop: '10px' }}
              type="submit"
              disabled={!text}
            >
              Post
            </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ authedUser }, { qid }) => {
  return {
    authedUser,
    qid
  };
};

export default connect(mapStateToProps, { addComment })(CommentForm);
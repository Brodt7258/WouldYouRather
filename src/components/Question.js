import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import Toolbar from 'material-ui-next/Toolbar';
import moment from 'moment';

class Question extends Component {
  render() {
    const { id, question: {optionOne, optionTwo, timestamp }, author } = this.props;
    const date = moment(timestamp).format('MMM Do, YYYY | h:mm a');

    return (
      <Link to={`/question/${id}`} style={{ margin: 20, textDecoration: 'none', color: 'black' }}>
         <Card>
         <Paper style={{ display: 'flex', backgroundColor: '#b0bec5', padding: '10px' }}>
            <div style={{ flex: 1 }}>
              <div>{`${author.name} asks:`}</div>
              <div>{date}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div>Likes</div>
              <div>Comments</div>
            </div>
          </Paper>
          <CardContent>
            <h4 style={{ textAlign: 'center' }}>Would You Rather?</h4>
            <div style={{ flex: 1, display: 'flex' }}>
              <div style={{ flex: 1, textAlign: 'center', marginRight: '10px' }}>
              <Paper style={{ minHeight: '3rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  {optionOne.text}
                </div>
              </Paper>
              </div>
              <div style={{ flex: 1, textAlign: 'center', marginLeft: '10px' }}>
              <Paper style={{ minHeight: '3rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  {optionTwo.text}
                </div>
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
  return {
    question: questions[id],
    author: users[questions[id].author]
  };
};

export default connect(mapStateToProps)(Question);
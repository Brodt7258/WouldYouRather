import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from 'material-ui/Card'

class Question extends Component {
  render() {
    const { id, question: {optionOne, optionTwo }, author } = this.props;

    return (
      <Link to={`/question/${id}`}>
        <Card>
          <CardHeader title={`${author.name} asks:`}/>
        </Card>
      
      
      
        {/*<div className="card tile is-child">
          <div className="card-content">
            <div className="content">
              <p className="title is-5">{`${author.name} asks:`}</p>
              <p className="subtitle is-6">Would you Rather...?</p>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">{optionOne.text}</p>
              <p className="card-footer-item">{optionTwo.text}</p>
            </footer>
          </div>
        </div>*/}
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
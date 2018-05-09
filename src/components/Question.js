import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { id, question: { optionOne, optionTwo } } = this.props;

    return (
      <div className="tile is-parent">
        <div className="card tile is-child">
          <header className="card-header">
            <p className="card-header-title">
              Question {id}
            </p>
          </header>
          <div className="card-content tile is-ancestor">
            <div className="content tile is-parent">
              <div className="tile is-child">{optionOne.text}</div>
              <div className="tile is-child">{optionTwo.text}</div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = ({ questions }, { id }) => {
  return {
    question: questions[id]
  };
};

export default connect(mapStateToProps)(Question);
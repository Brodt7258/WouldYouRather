import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    return (
      <div>
        <div>Leaderboard</div>
        <br/>
        {
          users.map(u => (
            <div key={u.id}>
              {`${u.name}  |  ${u.score}`}
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: users 
    ? Object.values(users)
      .map(({ id, name, answers, questions }) => ({ id, name, score: questions.length + Object.keys(answers).length  }))
      .sort((a, b) => b.score - a.score)
    : []
  }
};

export default connect(mapStateToProps)(Leaderboard);
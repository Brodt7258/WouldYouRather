import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Paper from 'material-ui-next/Paper';
import UserAvatar from './UserAvatar';

class Leaderboard extends Component {
  render() {
    const { users, history } = this.props;

    return (
      <div>
        <p style={{ textAlign: 'center' }}>Leaderboard</p>
        <Paper>
          <Table>
            <TableHead style={{ backgroundColor: '#b0bec5' }}>
              <TableRow>
                <TableCell>rank</TableCell>
                <TableCell padding="none"></TableCell>
                <TableCell>name</TableCell>
                <TableCell numeric>asked</TableCell>
                <TableCell numeric>answered</TableCell>
                <TableCell numeric>score</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                users.map((u, i) => (
                  <TableRow
                    key={u.id}
                    hover
                    onClick={() => history.push(`/user/${u.id}`)}
                  >
                    <TableCell>{i+1}</TableCell>
                    <TableCell padding="none">
                      <UserAvatar uID={u.id} />
                    </TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell numeric>{u.asked}</TableCell>
                    <TableCell numeric>{u.answered}</TableCell>
                    <TableCell numeric>{u.asked + u.answered}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: users 
    ? Object.values(users)
      .map(({ id, name, answers, questions }) => ({
        id,
        name,
        asked: questions
          ? questions.length
          : 0,
        answered: answers
          ? Object.keys(answers).length
          : 0,
      }))
      .sort((a, b) => (b.asked + b.answered) - (a.asked + a.answered))
    : []
  }
};

export default withRouter(connect(mapStateToProps)(Leaderboard));
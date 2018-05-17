import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from 'material-ui-next/Toolbar';
import Button from 'material-ui-next/Button';
import Avatar from 'material-ui-next/Avatar';
import AppBar from 'material-ui-next/AppBar';
import logo from '../images/icon-01.png';
import NavAuth from './NavAuth';


class Nav extends Component {
  
  render() {

    return (
      <AppBar position="static" >
        <Toolbar>
          <Avatar src={logo} alt="Would you Rather..?" component={Link} to="/" style={{ marginRight: 15 }} />
          <div style={{ flex: 1 }}>
            <Button component={Link} to="/">
              Home
            </Button>
            <Button component={Link} to="/leaderboard">
              Leaderboard
            </Button>
            <Button component={Link} to="/new">
              Ask
            </Button>
          </div>
          <NavAuth />
        </Toolbar>
      </AppBar>
      
    );
  }
}

// const mapStateToProps = ({ users, authedUser }) => {
//   return {
//     user: users[authedUser]
//   };
// };

export default connect()(Nav);
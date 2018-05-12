import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from 'material-ui-next/Toolbar';
import Button from 'material-ui-next/Button';
import Avatar from 'material-ui-next/Avatar';
import logo from '../images/icon-01.png';
import AuthMenu from './AuthMenu';


class Nav extends Component {
  styles = {
    avatar: {
      margin: 10,
    },
  }
  
  render() {
    const { user } = this.props;

    return (
      <Toolbar>
          <Avatar src={logo} alt="Would you Rather..?" component={Link} to="/" style={{marginRight: 15}} />
          <Button component={Link} to="/">
            Home
          </Button>
          <Button component={Link} to="/leaderboard">
            Leaderboard
          </Button>
          <Button component={Link} to="/new">
            Ask
          </Button>
          <AuthMenu />
      </Toolbar>
    );
    // return (
    //   <nav className="navbar">
    //     <div className="navbar-brand">
    //       <Link to="/" exact className="navbar-item">
    //         <img src={logo} alt="Would you Rather..?"/>
    //       </Link>
    //     </div>
    //     <div className="navbar-menu">
    //       <div className="navbar-start">
    //         <Link to="/" exact className="navbar-item">
    //           Home
    //         </Link>
    //         <Link to="/leaderboard" className="navbar-item">
    //           Leaderboard
    //         </Link>
    //         <Link to="/new" className="navbar-item">
    //           Ask
    //         </Link>
    //       </div>
    //       <div className="navbar-end">
    //         <div className="navbar-item">
    //           {
    //             user
    //               ? user.name
    //               : "Sign In"
    //           }
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    user: users[authedUser]
  };
};

export default connect(mapStateToProps)(Nav);
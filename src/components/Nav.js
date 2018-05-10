import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import logo from '../images/WYR-01.png';

class Nav extends Component {
  render() {
    const { user } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <NavLink to="/" exact className="navbar-item">
            <img src={logo} alt="Would you Rather..?"/>
          </NavLink>
          <NavLink to="/" exact className="navbar-item">
            Home
          </NavLink>
          <NavLink to="/leaderboard" className="navbar-item">
            Leaderboard
          </NavLink>
          <NavLink to="/new" className="navbar-item">
            Ask
          </NavLink>
        </ToolbarGroup>
      </Toolbar>
    );
    // return (
    //   <nav className="navbar">
    //     <div className="navbar-brand">
    //       <NavLink to="/" exact className="navbar-item">
    //         <img src={logo} alt="Would you Rather..?"/>
    //       </NavLink>
    //     </div>
    //     <div className="navbar-menu">
    //       <div className="navbar-start">
    //         <NavLink to="/" exact className="navbar-item">
    //           Home
    //         </NavLink>
    //         <NavLink to="/leaderboard" className="navbar-item">
    //           Leaderboard
    //         </NavLink>
    //         <NavLink to="/new" className="navbar-item">
    //           Ask
    //         </NavLink>
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
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/WYR-01.png';

class Nav extends Component {
  render() {
    const { authedUser } = this.props;
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" exact className="navbar-item">
            <img src={logo} alt="Would you Rather..?"/>
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" exact className="navbar-item">
              Home
            </NavLink>
            <NavLink to="/leaderboard" className="navbar-item">
              Leaderboard
            </NavLink>
            <NavLink to="/new" className="navbar-item">
              Ask
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {
                authedUser
                  ? authedUser
                  : "Sign In"
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(Nav);
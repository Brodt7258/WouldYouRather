import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/Logo.png';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" exact className="navbar-item">
            <img src={logo} alt="Would you Rather..?"/>
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Nav;
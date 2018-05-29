import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'material-ui-next/Toolbar';
import Button from 'material-ui-next/Button';
import Avatar from 'material-ui-next/Avatar';
import AppBar from 'material-ui-next/AppBar';
import logo from '../images/icon-01.png';
import NavAuth from './NavAuth';


const Nav = () => (
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

export default Nav;
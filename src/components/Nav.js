import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import logo from '../images/WYR-01.png';

class Nav extends Component {
  render() {
    const { user } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup>
          <Link to="/" >
            <Avatar>
              <img src={logo} alt="Would you Rather..?" height="100" width="100" />
            </Avatar>
          </Link>
          <RaisedButton label="Home" containerElement={<Link to="/" />}/>
          <RaisedButton label="Leaderboard" containerElement={<Link to="/leaderboard" />}/>
          <RaisedButton label="Ask" containerElement={<Link to="/new" />}/>
        </ToolbarGroup> 
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui-next/Button';
import Menu from 'material-ui-next/Menu';
import UserAvatar from './UserAvatar';
import AuthMenu from './AuthMenu';

class NavAuth extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const { isLoading, currentUser } = this.props;
    const { anchorEl } = this.state;
    
    return (
        isLoading
        ? null
        : (<div>
          <div style={{ display: 'flex' }} onClick={this.handleClick}>
            {currentUser && <UserAvatar uID={currentUser.id} />}
            <Button >
              {currentUser ? currentUser.name : 'Login'}
            </Button>
            
          </div>
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
            <AuthMenu handleLoggedIn={this.handleClose} />
            </Menu>
          </div>
        )
        
    );
  }
}

const mapStateToProps = ({ users, authedUser, isLoading }) => {
  return {
    currentUser: authedUser ? Object.values(users).filter(u => u.id === authedUser)[0] : null,
    isLoading
  };
};

export default connect(mapStateToProps)(NavAuth);
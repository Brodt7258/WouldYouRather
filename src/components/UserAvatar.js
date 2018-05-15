import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui-next/Avatar';

class UserAvatar extends Component {
  render() {
    const { name, avatarURL } = this.props;

    return (
      avatarURL
      ? <Avatar src={avatarURL} />
      : <Avatar>{name[0].toUpperCase()}</Avatar>
    );
  }
}

const mapStateToProps = ({ users }, { uID }) => {
  return {
    name: users[uID].name,
    avatarURL: users[uID].avatarURL
  };
}

export default connect(mapStateToProps)(UserAvatar);
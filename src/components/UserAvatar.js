import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui-next/Avatar';

class UserAvatar extends Component {
  render() {
    const { name, avatarURL, style } = this.props;

    return (
      avatarURL
      ? <Avatar src={avatarURL} style={style} />
      : <Avatar style={style}>{name && name[0].toUpperCase()}</Avatar>
    );
  }
}

const mapStateToProps = ({ users }, { uID }) => {
  return {
    name: uID ? users[uID].name : '',
    avatarURL: uID ? users[uID].avatarURL : ''
  };
}

export default connect(mapStateToProps)(UserAvatar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui-next/Avatar';

class UserAvatar extends Component {
  render() {
    const { name, avatarURL, style } = this.props;

    return (
      avatarURL
      ? <Avatar src={avatarURL} style={style} />
      : <Avatar style={{ background: 'linear-gradient(30deg, rgba(79,97,175,.8), rgba(79,97,175,0) 60%),' +
                                     'linear-gradient(105deg, rgba(226,55,139,.8), rgba(226,55,139,0) 60%),' + 
                                     'linear-gradient(195deg, rgba(254,146,69,.8), rgba(254,146,69,0) 60%),' + 
                                     'linear-gradient(285deg, rgba(57,181,191,.8), rgba(57,181,191,0) 60%)', 
                      ...style }}>{name && name[0].toUpperCase()}</Avatar>
    );
  }
}

const mapStateToProps = ({ users }, { uID, style }) => {
  return {
    name: uID ? users[uID].name : '',
    avatarURL: uID ? users[uID].avatarURL : '',
    style
  };
}

export default connect(mapStateToProps)(UserAvatar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui-next/Avatar';

class UserAvatar extends Component {
  render() {
    const { name, avatarURL, style } = this.props;
    const time = new Date().getTime() % 360;

    return (
      avatarURL
      ? <Avatar src={avatarURL} style={style} />
      : <Avatar style={{ background: `linear-gradient(${time + 45}deg, rgba(79,97,175,1), rgba(79,97,175,0) 60%),` +
                                     `linear-gradient(${time + 105}deg, rgba(226,55,139,1), rgba(226,55,139,0) 60%),` + 
                                     `linear-gradient(${time + 195}deg, rgba(254,146,69,1), rgba(254,146,69,0) 60%),` + 
                                     `linear-gradient(${time + 285}deg, rgba(57,181,191,1), rgba(57,181,191,0) 60%)`,
                                     //Yeah, all of this was completely excessive
                                     //I also tried to set up a timer to rerender,
                                     //but it didn't work. Something tells me that
                                     // React lifecycle methods aren't the right tool for this job
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
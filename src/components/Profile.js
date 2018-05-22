import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Question from './Question';
import UserAvatar from './UserAvatar';
import NotFound from './NotFound';

class Profile extends Component {
  render() {
    const { user, asked, answered, notFound } = this.props;

    if (notFound) {
      return <NotFound />
    }

    return (
      <div>
        <Card style={{ margin: 'auto', marginTop: '20px', width: '35%' }}>
          <CardContent style={{ textAlign: 'center' }}>
            <UserAvatar style={{ margin: 'auto' }} uID={user.id} />
            <p>{user.name}</p>
            {
              asked &&
              <p>Asked: {asked.length}</p>
            }
            {
              answered &&
              <p>Answered: {answered.length}</p>
            }
            <p>Score: {asked.length + answered.length}</p>
          </CardContent>
        </Card>

        <div>
          <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Asked ({asked.length})</p>
        {
          asked &&
          asked.map(q => <Question key={q} id={q} />)
        }
        </div>

        <div>
        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>Answered ({answered.length})</p>
        {
          answered &&
          answered.map(q => <Question key={q} id={q} />)
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, questions }, props) => {
  const { id } = props.match.params;
  const user = users[id];

  if (!user) {
    return {
      notFound: true
    }
  }
  return {
    user,
    asked: user.questions
      ? user.questions
      : [],
    answered: user.answers
      ? Object.keys(user.answers)
      : []
  }
};

export default connect(mapStateToProps)(Profile);
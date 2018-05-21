import React from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui-next/Card';
import Paper from 'material-ui-next/Paper';
import moment from 'moment';
import UserAvatar from './UserAvatar';

const Comments = ({ comments }) => {
  return (
    <Card style={{ marginTop: '20px' }}>
        {
            comments.map((c, i) => (
              <div key={c.id}>
                <div style={{ display: 'flex' }}>
                  <Paper style={{ width: '237px', padding: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#b0bec5' }}>
                    <UserAvatar uID={c.author} style={{ marginRight: '10px' }} />
                    <div>
                      <div>{c.authorName}</div>
                      <div>{moment(c.timestamp).format('MMM Do, YYYY | h:mm a')}</div>
                    </div>
                  </Paper>
                  <CardContent style={{ flex: '2', display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: '0px 36px' }}>
                    {c.text}
                  </p>
                  </CardContent>
                </div>
                {
                  i < comments.length - 1 &&
                  <hr />
                }
              </div>
            ))
        }
    </Card>
  );
}

const mapStateToProps = ({ questions, users }, { qid }) => {
  return {
    comments: Object.values(questions[qid].comments)
      .map(c => ({ ...c, authorName: users[c.author].name }))
      .sort((a, b) => b.timestamp - a.timestamp)
  }
};

export default connect(mapStateToProps)(Comments);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card, { CardContent } from 'material-ui-next/Card';
import TextField from 'material-ui-next/TextField';
import Button from 'material-ui-next/Button';
import { createUser } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser';

class CreateUser extends Component {
  state = {
    user: {
      id: '',
      name: ''
    },
    done: false,
    taken: false
  }

  NAME_MAX = 20;
  
  handleCreateUser = (e) => {
    const { dispatch } = this.props;
    const { user, taken } = this.state;

    e.preventDefault();

    if (!taken) {
      dispatch(createUser(user));
      dispatch(setAuthedUser(user.id));
      this.setState({ done: true });
    }
  }

  handleChange = e => {
    if (e.target.value.length <= this.NAME_MAX) {
      this.setState({ 
        user: {
          id: e.target.value.split(' ').join('').toLowerCase(),
          name: e.target.value
        }
      }, this.checkTaken);
      
    }
  }

  checkTaken = () => {
    const { user } = this.state;
    const { users } = this.props;

    this.setState({
      taken: users.includes(user.id)
    });
  }

  render() {
    const { user, done, taken } = this.state;

    if(done) {
      return <Redirect to={'/'} />;
    }

    return (
      <div style={{ marginTop: '20px' }}>
        <p style={{ textAlign: 'center' }}>Sign up</p>
        <Card style={{ width: '35%', margin: 'auto' }}>
          <CardContent>
            <form onSubmit={this.handleCreateUser}>
              <TextField
                placeholder="User Name"
                fullWidth
                value={user.name}
                onChange={this.handleChange}
                required
              />
              <div style={{ display: 'flex' }}>
                <Button
                  style={{ marginTop: '20px' }}
                  onClick={() => this.setState({ done: true })}
                >
                  Cancel
                </Button>

                <div style={{ flex: '1' }}></div>
                <Button
                  style={{ marginTop: '20px' }}
                  type="submit"
                  disabled={taken || user.id === ''}
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users)
  }
}

export default connect(mapStateToProps)(CreateUser);
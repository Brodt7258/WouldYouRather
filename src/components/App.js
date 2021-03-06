import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Nav from './Nav';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import QuestionDetails from './QuestionDetails';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import CreateUser from './CreateUser';
import Profile from './Profile';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { isLoading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div style={{ maxWidth: '50rem', margin: 'auto' }}>
            <Nav />
            {
              isLoading
              ? null
              : <Switch>
                  <PrivateRoute path="/" exact component={Dashboard} />
                  <Route path="/login" component={Login} />
                  <Route path="/create" component={CreateUser} />
                  <PrivateRoute path="/leaderboard" component={Leaderboard} />
                  <PrivateRoute path="/new" component={NewQuestion} />
                  <PrivateRoute path="/question/:id" component={QuestionDetails} />
                  <PrivateRoute path="/user/:id" component={Profile} />
                  <Route component={NotFound}/>
                </Switch>
            }
          </div>
        </Fragment>
      </Router>

    );
  }
}

const mapStateToProps = ({ isLoading }) => {
  return {
    isLoading
  };
};

export default connect(mapStateToProps)(App);

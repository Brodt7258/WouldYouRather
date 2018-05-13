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

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true
              ? null
              : <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <PrivateRoute path="/new" component={NewQuestion} />
                  <PrivateRoute path="/question/:id" component={QuestionDetails} />
                  <Route component={NotFound}/>
                </Switch>
            }
          </div>
        </Fragment>
      </Router>

    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null
  };
};

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Paper from 'material-ui-next/Paper';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  state = {
    value: 'a'
  }
  
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    const { authedUser } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            centered
          >
            <Tab label="New" value="a" />
            <Tab label="Answered" value="b" disabled={!authedUser} />
          </Tabs>
        </Paper>
        {value === 'a' && <QuestionList type="new" />}
        {value === 'b' && <QuestionList type="answered" />}
      </div>
      
      
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(Dashboard);
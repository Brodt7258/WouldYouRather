import React, { Component } from 'react';
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
            <Tab label="Answered" value="b" />
          </Tabs>
        </Paper>
        {value === 'a' && <QuestionList type="new" />}
        {value === 'b' && <QuestionList type="answered" />}
      </div>
      
      
    );
  }
}

export default Dashboard;
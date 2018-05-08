import React, { Component } from 'react';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>Dashboard</div>
        <QuestionList type="unanswered" />
        <QuestionList type="answered" />
      </div>
    );
  }
}

export default Dashboard;
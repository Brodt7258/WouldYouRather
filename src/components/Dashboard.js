import React, { Component } from 'react';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  state = {
    show: 'new'
  }
  
  toggleQuestions = () => {
    this.setState(prev => ({
      show: prev.show === 'new' ? 'answered' : 'new'
    }));
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <div className="tabs is-centered">
          <ul>
            <li className={show === 'new' ? 'is-active' : ''}><a onClick={this.toggleQuestions}>New</a></li>
            <li className={show === 'answered' ? 'is-active' : ''}><a onClick={this.toggleQuestions}>Answered</a></li>
          </ul>
        </div>

        {/*This feels badly optimized, but it's what I've got for now*/}
        {show === 'new' && <QuestionList type="new" />}
        {show === 'answered' && <QuestionList type="answered" />}
      </div>
    );
  }
}

export default Dashboard;
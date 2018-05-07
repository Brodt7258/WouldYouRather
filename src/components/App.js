import React, { Component } from 'react';
import PollList from './PollList';

class App extends Component {
  render() {
    return (
      <div>
        <div>App</div>
        <PollList />
        <PollList />
      </div>
    );
  }
}

export default App;

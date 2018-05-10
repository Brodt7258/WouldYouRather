import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  state = {
    value: 'a'
  }
  
  handleChange = (value) => {
    this.setState({
      value
    });
  };

  render() {
    const { value } = this.state;

    return (
      <Tabs
        value={value}
        onChange={this.handleChange}
      >
        <Tab label="New" value="a">
          <QuestionList type="new" />
        </Tab>
        <Tab label="Answered" value="b">
          <QuestionList type="answered" />
        </Tab>
      </Tabs>
    );

    // return (
    //   <div>
    //     <div className="tabs is-centered">
    //       <ul>
    //         <li className={show === 'new' ? 'is-active' : ''}><a onClick={this.toggleQuestions}>New</a></li>
    //         <li className={show === 'answered' ? 'is-active' : ''}><a onClick={this.toggleQuestions}>Answered</a></li>
    //       </ul>
    //     </div>

    //     {/*This feels badly optimized, but it's what I've got for now*/}
    //     {show === 'new' && <QuestionList type="new" />}
    //     {show === 'answered' && <QuestionList type="answered" />}
    //   </div>
    //);
  }
}

export default Dashboard;
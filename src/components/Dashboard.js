import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import QuestionList from './QuestionList';

class Dashboard extends Component {
  state = {
    value: 'b'
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
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="New" value="a" />
          <Tab label="Answered" value="b" />
        </Tabs>

        {value === 'a' && <QuestionList type="new" />}
        {value === 'b' && <QuestionList type="answered" />}
      </div>
      
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
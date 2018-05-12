import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  };

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion({ optionOne, optionTwo }));

    this.setState({
      toHome: true
    });
  }
  
  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    const oneLeft = 280 - optionOne.length;
    const twoLeft = 280 - optionTwo.length;

    return (
      <div>
        <div>NewQuestion</div>
        <form className="" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="First Option"
            value={optionOne}
            onChange={this.handleChange('optionOne')}
            className=""
            maxLength={280}
          />
          {oneLeft <= 100 && (
            <div className="">
              {oneLeft}
            </div>
          )}
          <textarea
            placeholder="Second Option"
            value={optionTwo}
            onChange={this.handleChange('optionTwo')}
            className=""
            maxLength={280}
          />
          {twoLeft <= 100 && (
            <div className="">
              {twoLeft}
            </div>
          )}
          <button
            className=""
            type="submit"
            disabled={optionOne === '' || optionTwo === ''}
          >
            Submit
          </button>
        </form>
      </div>
      
    );
  }
}

export default connect()(NewQuestion);
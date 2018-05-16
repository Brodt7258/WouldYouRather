import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui-next/TextField';
import Card, { CardContent } from 'material-ui-next/Card';
import Button from 'material-ui-next/Button';
import InputAdornment from 'material-ui-next/Input/InputAdornment';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    newQID: '',
    cancel: false
  };

  OPTION_MAX = 60;

  handleChange = key => e => {
    if (e.target.value.length <= this.OPTION_MAX) {
      this.setState({ [key]: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion({ optionOne, optionTwo }))
      .then(res => {
        this.setState({
          newQID: res.question.id
        });
      });
  }
  
  render() {
    const { optionOne, optionTwo, newQID, cancel } = this.state;

    if(cancel) {
      return <Redirect to={'/'} />;
    }

    if (newQID) {
      return <Redirect to={`/question/${newQID}`} />;
    }

    const WARN_SIZE = 30;

    const oneLeft = this.OPTION_MAX - optionOne.length;
    const twoLeft = this.OPTION_MAX - optionTwo.length;

    return (
      <Card style={{ marginTop: '20px', display: 'flex' }}>
        <CardContent style={{ flex: 1 }}>

          <p style={{ textAlign: 'center' }}>
            Would you Rather?
          </p>

          <form onSubmit={this.handleSubmit}>
            <div style={{ display: 'flex' }}>

              <div style={{ flex: 1, textAlign: 'center', margin: '10px' }}>
              <TextField
                placeholder="First Option"
                value={optionOne}
                onChange={this.handleChange('optionOne')}
                multiline
                fullWidth
                required
                rows={2}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{oneLeft <= WARN_SIZE ? oneLeft : ''}</InputAdornment>,
                }}
              />
              </div>

              <div style={{ flex: 1, textAlign: 'center', margin: '10px' }}>
                <TextField
                  placeholder="Second Option"
                  value={optionTwo}
                  onChange={this.handleChange('optionTwo')}
                  multiline
                  fullWidth
                  required
                  rows={2}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{twoLeft <= WARN_SIZE ? twoLeft : ''}</InputAdornment>,
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <Button
                style={{ marginTop: '10px' }}
                onClick={() => this.setState({ cancel: true })}
              >
                Cancel
              </Button>

              <div style={{ flex: '1' }}></div>
              <Button
                style={{ marginTop: '10px' }}
                type="submit"
                disabled={optionOne === '' || optionTwo === ''}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
    );
  }
}

export default connect()(NewQuestion);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui-next/styles';
import middleware from './middleware';
import reducer from './reducers';

const store = createStore(reducer, middleware);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b0bec5'
    },
    secondary: {
      main: '#e2378B'
    }
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'));

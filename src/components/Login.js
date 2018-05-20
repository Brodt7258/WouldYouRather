import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui-next/Paper';
import { MenuList } from 'material-ui-next/Menu';
import AuthMenu from './AuthMenu';

const Login = (props) => {
  const { from } = props.location.state
  const { history } = props;

  const handleLoggedIn = () => history.push(from);

  return (
    <div style={{ marginTop: '20px' }}>
      <p style={{ textAlign: 'center' }}>Login</p>
      <Paper style={{ width: '35%', margin: 'auto' }}>
        <MenuList>
          <AuthMenu handleLoggedIn={handleLoggedIn}/>    
        </MenuList>
      </Paper>
    </div>
  );
}

export default withRouter(Login);
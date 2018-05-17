import React from 'react';
import Paper from 'material-ui-next/Paper';
import { MenuList } from 'material-ui-next/Menu';
import AuthMenu from './AuthMenu';

const Login = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <p style={{ textAlign: 'center' }}>Login</p>
      <Paper style={{ width: '35%', margin: 'auto' }}>
        <MenuList>
          <AuthMenu />    
        </MenuList>
      </Paper>
    </div>
  );
}

export default Login;
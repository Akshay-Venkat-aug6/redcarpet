import React from 'react';
import Login from '../components/Login';

const roler = [
  {
    value: 'agent',
    label: 'Agent',
  },
  {
    value: 'customer',
    label: 'Customer',
  }
];

const LoginPage = () => {
  return(
    <>
      <div className="creTitle">
        <h2>Login</h2>
      </div>
      <Login roler={roler} />
    </>
  )
};

export default LoginPage
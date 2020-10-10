import React from 'react';
import Login from '../components/AdminLogin';

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
        <h2>Admin Login</h2>
      </div>
      <Login roler={roler} />
    </>
  )
};

export default LoginPage
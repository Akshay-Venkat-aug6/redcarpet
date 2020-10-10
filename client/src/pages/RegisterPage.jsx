import React from 'react';
import Register from '../components/Register';

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

const Registerpage = () => {
  return(
    <>
      <div className="creTitle">
        <h2>Register</h2>
      </div>
      <Register roler={roler} />
    </>
  )
};

export default Registerpage
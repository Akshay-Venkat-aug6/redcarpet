import React from 'react';
import Header from '../components/header/Agentheader';
import FormInput from '../components/form';
import LoanDetail from '../components/LoanDetail';
import { useSelector } from 'react-redux';

const LoanDetails = () => {
  const store = useSelector( store => store.loanRoot )
  return(
    <div>
      <Header />
      <FormInput />
      { store.isLoanDetails ?
        <LoanDetail /> :
        null
      }
    </div>
  )
};

export default LoanDetails
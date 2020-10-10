import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/header/Agentheader';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentLoans } from '../store/loan/action';
import { useHistory } from 'react-router-dom';
import LoanCard from '../components/LoanCard';
import Search from '../components/UserSearch';

const AgentHome = () => {
  
  const store = useSelector(store => store.loanRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(getAgentLoans(jwtDecode(token).id))
  }, [])

  return(
    <div>
      {store.isVerified ?
        <>
          <Header />
          <div style={{paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px' , marginLeft: '75%'}}>
            <Search loan={ store.loanView }/>
          </div>
          <LoanCard userlist = {store.searchContent}/>
        </>
        :
        store.isError ?
          history.push('/register') :
          <div>Loading!!!!</div> 
      }
    </div>
  )
};

export default AgentHome;
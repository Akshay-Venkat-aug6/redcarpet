import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/Agentheader';
import { useDispatch } from 'react-redux';
import { agenthome } from '../store/home/action';
import { useHistory } from 'react-router-dom';
import AgentCard from '../components/AgentCard';

const AgentHome = () => {
  const store = useSelector(store => store.homeRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(agenthome())
  }, [])

  return(
    <div>
      {store.isAuthenticated ?
        <>
          <Header />
          <AgentCard userlist = {store.user}/>
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
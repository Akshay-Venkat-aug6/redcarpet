import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/customerHeader';
import { useDispatch } from 'react-redux';
import { customerHome } from '../store/home/action';
import { useHistory } from 'react-router-dom';
import ListCard from '../components/ListCard';

const CustomerHome = () => {
  const store = useSelector(store => store.homeRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(customerHome())
  }, [])
  
  return(
    <div>
      {store.isAuthenticated ?
        <>
          <Header />
          <ListCard agentlist = {store.agents}/>
        </>
        :
        store.isError ?
          history.push('/login') :
          <div>Loading!!!!</div> 
      }
    </div>
  )
};

export default CustomerHome;
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/AdminHeader';
import { useDispatch } from 'react-redux';
import { adminHome } from '../store/home/action';
import { useHistory } from 'react-router-dom';
import Card from '../components/AdminHomeCard';
import Search from '../components/Search';

const AdminHome = () => {
  const store = useSelector(store => store.homeRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(adminHome())
  }, [])

  return(
    <div>
      {store.isAuthenticated ?
        <>
          <Header />
          <div style={{paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px' , marginLeft: '75%'}}>
            <Search />
          </div>
          <Card userlist = {store.searchContent}/>
        </>
        :
        store.isError ?
          history.push('/register') :
          <div>Loading!!!!</div> 
      }
    </div>
  )
};

export default AdminHome;
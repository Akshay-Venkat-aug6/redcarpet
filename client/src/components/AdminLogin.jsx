import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, makeStyles, MenuItem, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { adminLogin } from '../store/auth/action';

const useStyles = makeStyles({
  root: {
    width: 350,
    marginTop: "10px",
    marginLeft: "500px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField:{
    width: 320
  },
  textDiv:{
    marginTop: 10
  }
});



const Login = (props) => {
  const store = useSelector(store=>store.userRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(store.isSuccessed){
      if(store.isCustomer){
        history.push('/')
      }
      else{
        history.push('/')
      }
    }
  }, [store.isSuccessed])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = {
      username: name,
      password: password
    };
    if(!name || !password){
      return setError('All fields need to be field')
    }
    await dispatch(adminLogin(userData));
    console.log(store)
    if(!store.isSuccessed){
      setError('Credentials are Invlaid')
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div style={{textAlign: "center", color: "red"}}>
          {error}
        </div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} onBlur={() => setError('')}>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" className={classes.textField} label="User Name" variant="outlined" onChange={ (e) => setName(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" type="password" className={classes.textField} label="password" variant="outlined" onChange={ (e) => setPassword(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <Button variant="contained" color="primary" type="Submit" >Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login
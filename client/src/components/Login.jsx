import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, makeStyles, MenuItem, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../store/auth/action';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(store.isSuccessed){
      if(store.isCustomer){
        history.push('/customer/')
      }
      else{
        history.push('/agent/')
      }
    }
  }, [store.isSuccessed])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = {
      useremail: email,
      password: password,
      role: role
    };
    if(!email || !password || !role){
      return setError('All fields need to be field')
    }
    await dispatch(login(userData));
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
            <TextField id="outlined-basic" className={classes.textField} label="Email" variant="outlined" onChange={ (e) => setEmail(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" type="password" className={classes.textField} label="password" variant="outlined" onChange={ (e) => setPassword(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              className={classes.textField}
              onChange={ (e) => setRole(e.target.value) }
            >
              {props.roler.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.textDiv}>
            <Button variant="contained" color="primary" type="Submit" >Submit</Button>
          </div>
        </form>
        <div style={{marginLeft: "125px", marginTop: "20px"}}>
          <Button onClick={ () => history.push('/register') }>
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login
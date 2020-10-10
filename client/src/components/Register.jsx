import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, makeStyles, MenuItem, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../store/auth/action';

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



const Register = (props) => {
  const store = useSelector(store=>store.userRoot)
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username: username,
      email: email,
      phoneno: phoneno,
      password: password,
      role: role
    };
    dispatch(register(userData));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" className={classes.textField} label="Name" variant="outlined" onChange={ (e) => setUsername(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" className={classes.textField} label="Email" variant="outlined" onChange={ (e) => setEmail(e.target.value) }/>
          </div>
          <div className={classes.textDiv}>
            <TextField id="outlined-basic" className={classes.textField} label="phoneno" variant="outlined" onChange={ (e) => setPhoneno(e.target.value) }/>
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
          <Button onClick={ () => history.push('/login') }>
            LOGIN
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register
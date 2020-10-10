import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const store = useSelector( store => store.userRoot)
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = async() => {
    await dispatch(logout());
    window.location.reload(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            GetLoan
          </Typography>
          <Typography>
            <div style={{marginRight: "30px"}}>
              Welcome Admin !!
            </div>
          </Typography>
          <Typography>
            <div style={{marginRight: "30px"}}>
              <a style={{color: "white", cursor: "pointer"}} href="/agent" className="mr-3">Home</a>
            </div>
          </Typography>
          <Typography>
            <div style={{marginRight: "30px"}}>
              <a style={{color: "white", cursor: "pointer"}} href="/agent/loan" className="mr-3">Loan Detail</a>
            </div>
          </Typography>
          <Typography>
            <div>
              <a style={{color: "white", cursor: "pointer"}} onClick={handleLogout} className="mr-3">Logout</a>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
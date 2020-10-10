import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoans } from '../store/loan/action';
import { adminHome } from '../store/home/action';

const useStyles = makeStyles({
  root: {
    width: 1050,
    margin: 20,
    marginRight: 0
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
    marginTop: 10
  },
});

export default function LoanCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector( store => store.homeroot )

  var loanAvailable
  useEffect(() => {
    console.log(props.userlist.length)
    if(props.userlist.length != 0){
      loanAvailable = true
    }
    else{
      loanAvailable = false
    }
    console.log(loanAvailable)
  }, []);
  
  const handleApprove = (loanid, status) => {
    dispatch(updateLoans(loanid, status));
    dispatch(adminHome());
  }

  const handleReject = (loanid, status) => {
    dispatch(updateLoans(loanid, status));
    dispatch(adminHome());
  }

  const handleStatus = (status, loanid) => {
    console.log(loanid)
    if(status === "PENDING"){
      return ( 
        <>
          <div > status: <span style={{color: "blue"}}>{status} </span> </div>
          <div style={{marginTop: "10px"}}>
            <Button variant="contained" color="primary" onClick={() => handleApprove(loanid, 'APPROVED')}>
              Approved
            </Button>
            <Button variant="contained" color="secondary" style={{marginLeft: "10px"}} onClick={ () => handleReject(loanid, 'REJECTED')}>
              Rejected
            </Button>
          </div>
        </>
      )
    }
    else if(status === "REJECTED"){
      return <div > status: <span style={{color: "red"}}>{status} </span> </div>
    }
    else if(status === "APPROVED"){
      return <div > status: <span style={{color: "green"}}>{status} </span> </div>
    }
  }
  return (
    <div style={{display: "flex", flexWrap: "wrap", marginLeft: "100px" }}>
      {
        props.userlist.map(users => (
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Customer Name: {users.username}
              </Typography>
              <Typography variant="h5" component="h2">
                Agent Name: {users.agentname}
              </Typography>
              <Typography className={classes.pos}>
                <span>
                  Principle Amount: Rs.{users.principleAmount}
                </span>
                <span style={{paddingLeft: "20px"}}>
                  Interest Amount: Rs. {users.InterestAmount}
                </span>
                <span style={{paddingLeft: "20px"}}>
                  Duration ( in Years ): {users.duration}
                </span>
                <span style={{paddingLeft: "20px"}}>
                  Rate of Interest: {users.rate} %
                </span>
                <span style={{paddingLeft: "20px"}}>
                  Total Amount: Rs.{users.TotalAmountPayable}
                </span>
              </Typography>
              <Typography>
                { handleStatus(users.status, users.loanid) }
              </Typography>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
}

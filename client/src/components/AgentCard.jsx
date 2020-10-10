import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: 50,
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
  },
});

export default function AgentCard(props) {
  const classes = useStyles();
  const history = useHistory()
  return (
    <div style={{display: "flex", flexWrap: "wrap", marginLeft: "100px" }}>
      { props.userlist.map(users => (
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Customer
            </Typography>
            <Typography variant="h5" component="h2">
              {users.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {users.email}
            </Typography>
            <Typography variant="body2" component="p">
              {users.mobileno}
            </Typography>
            <Typography variant="body2" component="p" style={{marginTop: "10px"}}>
              Total Loan: {users.totalLoans}
            </Typography>
            <Typography variant="body2" component="p" style={{marginTop: "10px"}}>
              <span style={{marginRight: "20px"}}>
                Approved: {users.approved}
              </span>
              <span style={{marginRight: "20px"}}>
                Pending: {users.pending}
              </span>
              <span>
                Rejected: {users.rejected}
              </span>
            </Typography>
          </CardContent>
          <div className="m-2">
            <Button onClick={ () => history.push(`/agent/loandetails/${users.userid}`) }>
              View
            </Button>
          </div>
        </Card>
      )) }
    </div>
  );
}

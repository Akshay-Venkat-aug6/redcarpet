import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modals from './RequestModal';

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

export default function ListCard(props) {
  const classes = useStyles();
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  return (
    <div style={{display: "flex", flexWrap: "wrap", marginLeft: "100px" }}>
      { props.agentlist.map(agents => (
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Agent
            </Typography>
            <Typography variant="h5" component="h2">
              {agents.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {agents.email}
            </Typography>
            <Typography variant="body2" component="p">
              {agents.mobileno}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleShow}>Send Message</Button>
            <Modals handleShow={handleShow} handleClose={handleClose} show={show} agentid={agents.agentId}/>
          </CardActions>
        </Card>
      )) }
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Typography, Card, CardContent } from '@material-ui/core';
import EmiTable from './EmiTable';

const useStyles = makeStyles({
  root: {
    width: 1250,
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

const LoanDetails = (props) => {
  const classes = useStyles();
  const store = useSelector( store => store.loanRoot );
  console.log(store.loanDetails)
  return(
    <div>
      <Card className={classes.root}>
        <CardContent style={{display: "flex", flexWrap: "wrap"}}>
          <div className="ml-5">
            <Typography>
              EMI : <bold>Rs. {store.emiAmount}</bold>
            </Typography>
          </div>
          <div className="ml-5">
            <Typography>
                Principle Amount : <bold>Rs. {store.principleAmount}</bold>
            </Typography>
          </div>
          <div className="ml-5">
            <Typography>
                Intereset  Amount : <bold>Rs. {store.interestAmount}</bold>
            </Typography>
          </div>
          <div className="ml-5">
            <Typography>
                Duration : <bold>{store.duration} in years</bold>
            </Typography>
          </div>
          <div className="ml-5">
            <Typography>
                Rate : <bold>{store.rate} %</bold>
            </Typography>
          </div>
        </CardContent>
      </Card>
      <div className={classes.root}>
        <EmiTable loanDetail={store.loandetails}/>
      </div>
    </div>
  )
};

export default LoanDetails;
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  // console.log(prop.loanDetail)
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell align="right">Initial Balance</StyledTableCell>
              <StyledTableCell align="right">EMI</StyledTableCell>
              <StyledTableCell align="right">Interest Amount</StyledTableCell>
              <StyledTableCell align="right">Principal Amount</StyledTableCell>
              <StyledTableCell align="right">Remaining Balance</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.loanDetail.map((row) => (
                <StyledTableRow key={row.month}>
                  <StyledTableCell component="th" scope="row">
                    { row.year} - {row.month}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.details.InitialAmount}</StyledTableCell>
                  <StyledTableCell align="right">{row.details.emi}</StyledTableCell>
                  <StyledTableCell align="right">{row.details.interest}</StyledTableCell>
                  <StyledTableCell align="right">{row.details.principle}</StyledTableCell>
                  <StyledTableCell align="right">{row.details.Endingbalance}</StyledTableCell>
                </StyledTableRow>
              )) 
            }
          </TableBody>
        </Table>
      </TableContainer> 
    </>
  );
}

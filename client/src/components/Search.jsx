import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MenuItem, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { searchStatus } from '../store/home/action';

const useStyles = makeStyles({
  root: {
    width: 300,
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
    width: 200
  },
  textDiv:{
    marginTop: 10
  }
});

const searchcontent = [
  'PENDING',
  'APPROVED',
  'REJECTED'
];

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const store = useSelector( store => store.homeRoot);

  const handleSearch = (e) => {
    const status = e.target.value;
    dispatch(searchStatus(status, store.loan));
  }

  return (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        className={classes.textField}
        onChange={handleSearch}
      >
        {searchcontent.map((search) => (
          <MenuItem key={search} value={search}>
            {search}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

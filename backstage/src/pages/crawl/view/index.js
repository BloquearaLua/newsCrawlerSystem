import { makeStyles } from '@material-ui/styles';
import { Grid, Box } from '@mui/material';
import React, { useEffect } from 'react';

import Wordcloud from './wordcloud';
import WeekCount from './weekcount';
import Today from './today'

const useStyles = makeStyles({
  viewContainer: {
    width: "auto",
    margin: "-60px 10px 10px",
    borderRadius: '10px',
  },
  wordContainer: {
    backgroundColor:"#c2c2c2",
    borderRadius: "8px",
    padding: '10px 20px'
  },
})

export default function View() {
  const classes = useStyles();
  return (
    // <Grid container className={classes.viewContainer}>
    <Box className={classes.viewContainer}>
      <Grid container> 
        <Grid item xs={12}>
          <Today></Today>
        </Grid>
      </Grid>
      <Grid container >
        <Grid item xs={12} md={6}>
          <Wordcloud></Wordcloud>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeekCount></WeekCount>   
        </Grid>
      </Grid>
    </Box>
  )
}

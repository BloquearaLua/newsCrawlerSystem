import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Headers from './component/Header';
import IndexRouter from './router/IndexRouter';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
      light: grey[100]
    },
    secondary: {
      // main: '#e5e9f6',
      main: "#6037b2"
    },
    white: {
      main: grey[50]
    },
    deepColor:{
      main: grey[900]
    }
  },
});

const useStyle = makeStyles({
  toolbar: theme.mixins.toolbar
})


function App() {
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* 顶部固定  */}
          <Headers />
          <div className={classes.toolbar}></div>
          <Container>  
            {/* 切换部分 */}
            <IndexRouter />
          </Container>
        </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;

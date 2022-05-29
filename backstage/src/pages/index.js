// import React from 'react';
// import { Box } from '@mui/material';
// import Header from "../component/Header";
// import Sidebar from "../component/Sidebar";
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import CrawlRouter from '../router/CrawlRouter';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import pubsub from 'pubsub-js';
// import CssBaseline from '@mui/material/CssBaseline';
// // const theme = createTheme({
// //     palette: {
// //       primary: {
// //         main: "#5e35b1",
// //         light: "#ede7f6"
// //       },
// //       secondary: {
// //         main: "#5e35b1",
// //         light: "#ede7f6",
// //         dark: "#4527a0"
// //       },
// //       action:{
// //         main:"#ede7f6"
// //       },
// //       purple: {
// //         main: "#5e35b1",
// //         light: "#ede7f6",
// //         dark: "#4527a0"
// //       },
// //     }
// // });

// const drawerWidth = 160;
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'center',
// }));


// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       marginLeft: `-${drawerWidth}px`,
//       ...(open && {
//         transition: theme.transitions.create('margin', {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//       }),
//     }),
//   );

// export default function SandBox() {
//   const [open, setOpen] = React.useState(true);
//     const openRef = React.useRef(true)
//     React.useEffect(() => {
//         pubsub.subscribe("openDrawer",(_,data) => {
//             openRef.current = !openRef.current;
//             setOpen(openRef.current);
//         })
//     },[])
//     return (
//       <Box sx={{display:"flex"}}>
//         <CssBaseline />
//         <Header></Header>
//         <Sidebar></Sidebar>
//         <Main open={open}>
//           <DrawerHeader />
//           <CrawlRouter />
//         </Main>
//       </Box>
//     )
// }

// {/*<Fragment>*/}
//         {/* <ThemeProvider theme={theme}> */}
//           {/* <Header></Header>
//           <div className={classes.root}>
//             <Sidebar></Sidebar>
//               <Box className={classes.box}>
//                 <CrawlRouter />
//               </Box>
//           </div> */}
//           {/* </ThemeProvider> */}
//       // </Fragment>


// import React, { Fragment } from 'react';
// import { Box} from '@mui/material';
// import Header from "../component/Header";
// import Sidebar from "../component/Sidebar";
// import { makeStyles } from '@material-ui/styles';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import CrawlRouter from '../router/CrawlRouter'

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#5e35b1",
//         light: "#ede7f6"
//       },
//       secondary: {
//         main: "#5e35b1",
//         light: "#ede7f6",
//         dark: "#4527a0"
//       },
//       action:{
//         main:"#ede7f6"
//       },
//       purple: {
//         main: "#5e35b1",
//         light: "#ede7f6",
//         dark: "#4527a0"
//       },
//     }
// });
  
// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flex: 1,
//       marginTop: '65px',
//     },
//     box: {
//       flex: 1,
//       margin: "1em",
//       borderRadius: "10px",
//       backgroundColor: "#e3f2fd"
//     }
// }))
// export default function SandBox() {
//     const classes = useStyles();
//     return (
//       <Fragment>
//         <ThemeProvider theme={theme}>
//           <Box sx={{display:"flex"}}>
//             <Sidebar>
//             <Header>

//             </Header>
//           </Box>
//           {/* <Header></Header> */}
//           {/* <div className={classes.root}> */}
//             {/* <Sidebar></Sidebar> */}
//               {/* <Box className={classes.box}> */}
//                 {/* <CrawlRouter /> */}
//               {/* </Box> */}
//           {/* </div> */}
//         </ThemeProvider>
//       </Fragment>
//     )
// }
import * as React from 'react';
import pubsub from 'pubsub-js'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import CrawlRouter from '../router/CrawlRouter';

const drawerWidth = 160;
const useStyles = makeStyles({
  sidebar:{
    padding: '6px 16px',
    maxWidth: 260,
    height: 'calc(100vh - 65px)',
    color: "#585963"
  }
})
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: "70px 20px",
    borderRadius: "10px",
    backgroundColor: "#e3f2fd",
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    pubsub.subscribe('openDrawer',(_,data) => {
      setOpen(data);
    })
  })
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <Sidebar></Sidebar>
      <Main open={open}>
            <DrawerHeader />
            <CrawlRouter />
      </Main>
    </Box>
  );
}


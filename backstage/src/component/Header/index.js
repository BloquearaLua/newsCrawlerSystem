// import React,{ useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import pubsub from 'pubsub-js';
// import { Toolbar, Typography, Avatar, Box, MenuItem, styled } from '@mui/material';
// import { IconButton, Menu } from '@material-ui/core';
// import MenuIcon from '@mui/icons-material/Menu';
// import MuiAppBar from '@mui/material/AppBar';

// const drawerWidth = 180;
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// export default function Header() {
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const navigate = useNavigate();
//   const [open,setOpen] = useState(true);
 
//   const handleClick = () => {
//     setOpen(!open);
//     pubsub.publish('openDrawer',"you can open or close");
//   }

//   return (
//     // <Box sx={{flexGrow:1}}>
//     //   <AppBar position='fixed' sx={{bgcolor:"#fff",boxShadow:"none",zIndex:10}}>
//     //     <Toolbar>
          
//     //       <IconButton variant="contained" onClick={handleClick} className={classes.menuIcon}>
//     //         <MenuIcon fontSize='medium'/>
//     //       </IconButton>
          
//     //       <Box sx={{flexGrow:1}}></Box>
//     //       <Box sx={{flexGrow:0}}>
//     //         <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
//     //           <Avatar>A</Avatar>
//     //         </IconButton>
//     //         <Menu
//     //           id="logout-menu"
//     //           sx={{ mt: '80px'}}
//     //           anchorEl={anchorElUser}
//     //           keepMounted
//     //           open={Boolean(anchorElUser)}
//     //           onClose={() => setAnchorElUser(false)}
//     //           anchorOrigin= {{
//     //             vertical: 'top',
//     //             horizontal: 'right',
//     //           }}
//     //           transformOrigin={{
//     //             vertical: 'top',
//     //             horizontal: 'right',
//     //           }}
//     //         >
//     //           <MenuItem onClick={() => navigate('/login')}>
//     //             <Typography textAlign="center">注销</Typography>
//     //           </MenuItem>
//     //         </Menu>
//     //       </Box>
//     //     </Toolbar>
//     //   </AppBar>
//     // </Box>
    
//     <Box>
//       <AppBar position="fixed" open={open} sx={{bgcolor:"#fff",boxShadow:"none",zIndex:10}}>
//         <Toolbar>
//           <IconButton variant="contained" edge="start" 
//             sx={{
//               ml: 1,
//               p: "4px",
//               borderRadius: "6px",
//               color: "#6037b2",
//               background: "#ede7f6",
//               "&:hover": {
//                 background: "#6037b2",
//                 color: "#ede7f6"
//               }  
//             }}  
//             onClick={handleClick}>
//             <MenuIcon fontSize='medium'/>
//           </IconButton>

//           <Box sx={{flexGrow:1}}></Box>
//           <Box sx={{flexGrow:0}}>
//             <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
//               <Avatar>A</Avatar>
//             </IconButton>
//             <Menu
//               id="logout-menu"
//               sx={{ mt: '80px'}}
//               anchorEl={anchorElUser}
//               keepMounted
//               open={Boolean(anchorElUser)}
//               onClose={() => setAnchorElUser(false)}
//               anchorOrigin= {{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//             >
//               <MenuItem onClick={() => navigate('/login')}>
//                 <Typography textAlign="center">注销</Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   )
// }

import React,{ useState } from 'react';
import pubsub from 'pubsub-js';
import { Toolbar, Typography, Avatar, Box, MenuItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { IconButton, Menu } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles({
  logo:{
    "&:hover":{
      background: "none"
    }
  },
  menuIcon: {
    marginLeft: "250px",
    padding: "4px",
    borderRadius: "6px",
    color: "#6037b2",
    background: "#ede7f6",
    "&:hover": {
      background: "#6037b2",
      color: "#ede7f6"
    }
  }
});
const drawerWidth = 180;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [open,setOpen] = useState(true);
 
  const handleClick = () => {
    setOpen(!open);
    console.log(open);
    pubsub.publish('openDrawer',!open);
  }

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem("adminToken");
  }

  return (
    // <Box sx={{flexGrow:1}}>
    //   <AppBar position='fixed' sx={{bgcolor:"grey",boxShadow:"none",zIndex:10}}>
    //     <Toolbar>
          
    //       <IconButton variant="contained" onClick={handleClick} className={classes.menuIcon}>
    //         <MenuIcon fontSize='medium'/>
    //       </IconButton>
          
    //       <Box sx={{flexGrow:1}}></Box>
    //       <Box sx={{flexGrow:0}}>
    //         <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
    //           <Avatar>A</Avatar>
    //         </IconButton>
    //         <Menu
    //           id="logout-menu"
    //           sx={{ mt: '80px'}}
    //           anchorEl={anchorElUser}
    //           keepMounted
    //           open={Boolean(anchorElUser)}
    //           onClose={() => setAnchorElUser(false)}
    //           anchorOrigin= {{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //         >
    //           <MenuItem onClick={() => navigate('/login')}>
    //             <Typography textAlign="center">注销</Typography>
    //           </MenuItem>
    //         </Menu>
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  
  <Box>
    <AppBar position="fixed" open={open} sx={{bgcolor:"#fff",boxShadow:"none",zIndex:10}}>
    <Toolbar>
      <IconButton variant="contained" edge="start" 
        sx={{
          ml: 1,
          p: "4px",
          borderRadius: "6px",
          color: "#6037b2",
          background: "#ede7f6",
          "&:hover": {
            background: "#6037b2",
            color: "#ede7f6"
          }  
        }}  
        onClick={handleClick}>
        <MenuIcon fontSize='medium'/>
      </IconButton>

      <Box sx={{flexGrow:1}}></Box>
      <Box sx={{flexGrow:0}}>
        <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
          <Avatar>A</Avatar>
        </IconButton>
        <Menu
          id="logout-menu"
          sx={{ mt: '80px'}}
          anchorEl={anchorElUser}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(false)}
          anchorOrigin= {{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">注销</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
  </Box>
  )
}

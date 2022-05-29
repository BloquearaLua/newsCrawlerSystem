// import React,{useEffect, useState, useRef} from 'react';
// import pubsub from 'pubsub-js';
// import { NavLink } from 'react-router-dom';
// import List from '@mui/material/List';
// import { Divider, ListItemButton, ListItemIcon, ListItemText, Typography, Drawer, IconButton } from '@mui/material';
// import AddRoadIcon from '@mui/icons-material/AddRoad';
// import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
// import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
// import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
// import AlarmAddRoundedIcon from '@mui/icons-material/AlarmAddRounded';
// import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
// import BatchPredictionRoundedIcon from '@mui/icons-material/BatchPredictionRounded';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import ArtTrackIcon from '@mui/icons-material/ArtTrack';
// import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
// import {styled} from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core';

// const drawerWidth = 180;
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'center',
// }));
// const useStyles = makeStyles({
//   itemButton: {
//     padding: "10px",
//     width: `${drawerWidth}px`,
//     height: '50px',
//     marginTop: "10px",
//     '&:hover':{
//       fontWeight: '800',
//       borderRadius: '10px',
//       backgroundColor: "#ede7f6"
//     },
//     '&.active':{
//       borderRadius: '10px',
//       backgroundColor: "#ede7f6"
//     }
//   }
// })
// export default function Sidebar() {
//   // const [show,setShow] = useState(true);
//   const [open,setOpen] = useState(true);
//   let openRef = useRef(true);
//   const classes = useStyles();
//   const indexName = [
//     {
//       id: 1, name: '爬虫',path: '/crawl', icon: <AdbRoundedIcon/>,
//       children: [
//         {id: 2, name: '操作',path: '/crawl/operation', icon: <AlarmAddRoundedIcon fontSize='small'/>},
//         {id: 3, name: '数据可视化', path: '/crawl/view', icon: <AnalyticsRoundedIcon fontSize='small'/>}
//       ]},
//     {
//       id: 4, name: '新闻详情', path: '/news', icon: <BatchPredictionRoundedIcon/>,
//       children: [
//         {id: 5, name: '华尔街见闻', path: '/news/wallstreet', icon:<AddRoadIcon fontSize='small'/>},
//         {id: 6, name: "新浪新闻", path: '/news/weibo', icon: <ArtTrackIcon fontSize='small' />}
//       ]},
//     {
//       id: 7, name: '用户管理' ,path: '/user', icon: <AssignmentIndRoundedIcon/>,
//       children: [
//         {id: 8, name: '管理员', path: '/users/admin', icon: <AdminPanelSettingsRoundedIcon fontSize='small'/>},
//         {id: 9, name: "普通用户", path: '/users/common', icon: <ManageAccountsIcon fontSize='small'/>}
//       ]
//     }
//   ];

//   useEffect(()=>{
//     pubsub.subscribe("openDrawer",(_,data)=>{
//       openRef.current = !openRef.current;
//       setOpen(openRef.current);
//     })
//   },[])

//   const handleNav = (element) =>{
//     return (
//       element.map((item,i) => {
//         return (
//           <List
//             sx={{display:'flex',width:'100%',flexDirection:'column'}}
//             key={item.id}
//             subheader={
//               <Typography component='div' sx={{display:{xs:'none',md:"flex"},fontWeight:'400',ml:2,fontSize:12}}>
//                 {item.name}
//               </Typography>
//             }
//           >
//               {
//                 item.children.map((nav) => (
//                   <ListItemButton 
//                     component={NavLink} 
//                     to={nav.path} 
//                     key={nav.id}
//                     className={classes.itemButton}
//                     >
//                       <ListItemIcon sx={{ml: '8px',mr: '-20px'}}>
//                         {nav.icon}
//                       </ListItemIcon>
//                       {<ListItemText primary={
//                               <Typography variant='body2'>{nav.name}</Typography>
//                       }></ListItemText>}
//                   </ListItemButton>
//                 ))
//               }
//           </List>
//         )
//       })
//     );
//   }
//   return (
//     // <Box className={classes.sidebar}>
//     //   <CssBaseline />
//     //     <List component="nav" sx={{display:{xs:'none',md:"flex",flexDirection:"column"}}}>
//     //       {
//     //         indexName.length&&show ? (
//     //           handleNav(indexName,"md")
//     //         ) : null
//     //       }
//     //     </List>
//     //     <List component="nav" sx={{display:{xs:'flex',md:"none",flexDirection:"column"}}}>
//     //       {
//     //         indexName.length&&!show ? (
//     //           handleNav(indexName,"xs")
//     //         ) : null
//     //       }
//     //     </List>
//     // </Box>
//     // <Box className={classes.sidebar}>
//     //   {/* <CssBaseline /> */}
//     //   <Drawer 
//     //     sx={{
//     //       width: drawerWidth,
//     //       flexShrink: 0,
//     //       '& .MuiDrawer-paper': {
//     //         width: drawerWidth,
//     //         boxSizing: 'border-box',
//     //       },
//     //     }}
//     //     variant="persistent"
//     //     anchor="left"
//     //     open={open}>
//     //     <Toolbar>
//     //       <Box sx={{display:{xs:'none',md:"flex"}}}>
//     //         <IconButton edge="start" aria-label='open drawer' color="secondary" sx={{flexGrow:0}} className={classes.logo}>
//     //           <Brightness6OutlinedIcon fontSize='medium'/>
//     //           <Typography sx={{mr:3,flexGrow:0,color: "#212121",fontWeight:900}}>NewsCrawler</Typography>
//     //         </IconButton>
//     //       </Box>
//     //     </Toolbar>
//     //     <Box sx={{overflow:'hidden'}}>
//     //       <List component="nav" sx={{display:{xs:'none',md:"flex",flexDirection:"column"}}}>
//     //         {
//     //           indexName.length ? (
//     //             handleNav(indexName,"md")
//     //           ) : null
//     //         }
//     //       </List>
//     //       <List component="nav" sx={{display:{xs:'flex',md:"none",flexDirection:"column"}}}>
//     //         {
//     //           indexName.length ? (
//     //             handleNav(indexName,"xs")
//     //           ) : null
//     //         }
//     //       </List>
//     //     </Box>
//     //   </Drawer>
//     // </Box>
//     <Drawer
//         sx={{
//           border: "#fff",
//           width: drawerWidth,
//           // padding: "10px",
//           flexShrink: 0,
//           overflow: "auto",
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             border: "none"
//           },
//           '& hr':{
//             display: "none"
//           }
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton edge="start" color="secondary" sx={{display:{xs:"none",md:"flex"},flexGrow:0,'&:hover':{bgcolor:"#fff"}}}>
//             <Brightness6OutlinedIcon fontSize='medium'/>
//             <Typography sx={{color: "#212121",fontWeight:900}}>NewsCrawler</Typography>
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List component="nav" >
//             {
//               indexName.length ? (
//                 handleNav(indexName)
//               ) : null
//             }
//           </List>
//       </Drawer>
//   );
// }
import React,{useEffect, useState, useRef} from 'react';
import pubsub from 'pubsub-js';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import { Divider, ListItemButton, ListItemIcon, ListItemText, Typography, Drawer, IconButton } from '@mui/material';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AlarmAddRoundedIcon from '@mui/icons-material/AlarmAddRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import BatchPredictionRoundedIcon from '@mui/icons-material/BatchPredictionRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
import {styled} from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 180;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));
const useStyles = makeStyles({
  itemButton: {
    // padding: "10px",
    width: `${drawerWidth}px`,
    height: '50px',
    marginTop: "10px",
    '&:hover':{
      fontWeight: '800',
      borderRadius: '10px',
      backgroundColor: "#ede7f6"
    },
    '&.active':{
      borderRadius: '10px',
      backgroundColor: "#ede7f6"
    }
  },
  drawer: {
    padding: '10px'
  }
})
export default function Sidebar() {
  // const [show,setShow] = useState(true);
  const [open,setOpen] = useState(true);
  const classes = useStyles();
  const indexName = [
    {
      id: 1, name: '爬虫',path: '/crawl', icon: <AdbRoundedIcon/>,
      children: [
        {id: 2, name: '操作',path: '/crawl/operation', icon: <AlarmAddRoundedIcon fontSize='small'/>},
        {id: 3, name: '数据可视化', path: '/crawl/view', icon: <AnalyticsRoundedIcon fontSize='small'/>}
      ]},
    {
      id: 4, name: '新闻详情', path: '/news', icon: <BatchPredictionRoundedIcon/>,
      children: [
        {id: 5, name: '华尔街见闻', path: '/news/wallstreet', icon:<AddRoadIcon fontSize='small'/>},
        {id: 6, name: "新浪新闻", path: '/news/weibo', icon: <ArtTrackIcon fontSize='small' />}
      ]},
    {
      id: 7, name: '用户管理' ,path: '/user', icon: <AssignmentIndRoundedIcon/>,
      children: [
        {id: 8, name: '管理员', path: '/users/admin', icon: <AdminPanelSettingsRoundedIcon fontSize='small'/>},
        {id: 9, name: "普通用户", path: '/users/common', icon: <ManageAccountsIcon fontSize='small'/>}
      ]
    }
  ];

  useEffect(()=>{
    pubsub.subscribe("openDrawer",(_,data)=>{
      setOpen(data);
    })
  },[])

  const handleNav = (element) =>{
    return (
      element.map((item,i) => {
        return (
          <List
            sx={{display:'flex',width:'100%',flexDirection:'column'}}
            key={item.id}
            subheader={
              <Typography component='div' sx={{display:{xs:'none',md:"flex"},fontWeight:'400',ml:2,fontSize:12}}>
                {item.name}
              </Typography>
            }
          >
              {
                item.children.map((nav) => (
                  <ListItemButton component={NavLink} to={nav.path} key={nav.id} sx={{
                    margin: "6px",
                    '&:hover':{
                      fontWeight: '800',
                      borderRadius: '10px',
                      background: "#ede7f6",
                    },
                    '&.active':{
                      borderRadius: '10px',
                      background: "#ede7f6"
                    },
                  }} >
                      <ListItemIcon sx={{ml: '8px',mr: '-20px'}}>
                        {nav.icon}
                      </ListItemIcon>
                      {<ListItemText primary={
                              <Typography variant='body2'>{nav.name}</Typography>
                      }></ListItemText>}
                  </ListItemButton>
                ))
              }
          </List>
        )
      })
    );
  }
  
  return (
    // <Box className={classes.sidebar}>
    //   <CssBaseline />
    //     <List component="nav" sx={{display:{xs:'none',md:"flex",flexDirection:"column"}}}>
    //       {
    //         indexName.length&&show ? (
    //           handleNav(indexName,"md")
    //         ) : null
    //       }
    //     </List>
    //     <List component="nav" sx={{display:{xs:'flex',md:"none",flexDirection:"column"}}}>
    //       {
    //         indexName.length&&!show ? (
    //           handleNav(indexName,"xs")
    //         ) : null
    //       }
    //     </List>
    // </Box>
    // <Box className={classes.sidebar}>
    //   {/* <CssBaseline /> */}
    //   <Drawer 
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //         boxSizing: 'border-box',
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={open}>
    //     <Toolbar>
    //       <Box sx={{display:{xs:'none',md:"flex"}}}>
    //         <IconButton edge="start" aria-label='open drawer' color="secondary" sx={{flexGrow:0}} className={classes.logo}>
    //           <Brightness6OutlinedIcon fontSize='medium'/>
    //           <Typography sx={{mr:3,flexGrow:0,color: "#212121",fontWeight:900}}>NewsCrawler</Typography>
    //         </IconButton>
    //       </Box>
    //     </Toolbar>
    //     <Box sx={{overflow:'hidden'}}>
    //       <List component="nav" sx={{display:{xs:'none',md:"flex",flexDirection:"column"}}}>
    //         {
    //           indexName.length ? (
    //             handleNav(indexName,"md")
    //           ) : null
    //         }
    //       </List>
    //       <List component="nav" sx={{display:{xs:'flex',md:"none",flexDirection:"column"}}}>
    //         {
    //           indexName.length ? (
    //             handleNav(indexName,"xs")
    //           ) : null
    //         }
    //       </List>
    //     </Box>
    //   </Drawer>
    // </Box>
    <Drawer 
        className={classes.drawer}
        sx={{
          border: "#fff",
          width: drawerWidth,
          // padding: "10px",
          flexShrink: 0,
          overflow: "auto",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: "none"
          },
          '& hr':{
            display: "none"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton edge="start" color="secondary" sx={{display:{xs:"none",md:"flex"},flexGrow:0,'&:hover':{bgcolor:"#fff"}}}>
            <Brightness6OutlinedIcon fontSize='medium'/>
            <Typography sx={{color: "#212121",fontWeight:900}}>NewsCrawler</Typography>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav" >
            {
              indexName.length ? (
                handleNav(indexName)
              ) : null
            }
          </List>
      </Drawer>
  );
}
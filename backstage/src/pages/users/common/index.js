import React,{ useEffect, useRef, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Divider } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase} from '../../../component/Container/Search';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { axiosGet, axiosDelete } from '../../../util/https';

const useStyles = makeStyles({
  tableContainer:{
      marginTop: "-60px",
      border: "solid 1px #e3f2fd",
      borderRadius: '10px',
      backgroundColor: "#fff",
      width: 'auto',
  },
  title: {
      padding: '1em',
      width: "18em"
  },
  second: {
    padding: '0.5em 1.2em',
    display: "flex",
  },
});

const userType = {
  1: "管理员",
  2: "普通用户"
}
const gender = {
  0: "保密",
  1: "女",
  2: "男"
}
export default function Common() {
  const classes = useStyles();
  const [userList,setUserList] = useState([]);
  const [pageSize,setPageSize] = useState(5);
  const [count,setCount] = useState(0);
  const token = localStorage.getItem('adminToken');

  const col = [
    { field: 'username', headerName: '用户名', width: 180 },
    { field: 'email', headerName: '邮箱', width: 180 },
    { field: 'gender', headerName: '性别',type: 'date', width: 180 },
    { field: 'type', headerName: '用户类别', width: 180 },
    { field: 'createTime', headerName: '创建时间', width: 180 },
    { field: 'options', headerName: '操作', type: 'actions', width: 180, 
      getActions: ({id}) => [
        <GridActionsCellItem onClick={() => handleDelete(id)}  icon={<DeleteIcon />} label="Delete" />
      ]
    },
  ];

  useEffect(() => {
    (async () => {
      const result = await axiosGet(`/api/backstage/users/roleId=2`);
      // console.log(result);
      const data = handleGet(result.data);
      setUserList(data);
      setCount(result.count);
    })()
  },[]);

  const handleGet = (result) => {
    const data = [];
    result.map((item) => {
      data.push({
        id: item.id,
        username: item.username,
        email: item.email,
        gender: gender[item.gender],
        type: userType[item.role_id],
        createTime: moment(item.create_date).format("YYYY/MM/DD")
      })
    })
    return data;
  }

  const handleDelete = async(id) => {
    console.log(id);
    try {
      setTimeout(() => {
        setUserList(
          userList.filter((item) => (item.id !== id))
        );
      })
      await axiosDelete(`/api/user`,{userid:id},token);
    } catch (error) {
      console.log(error.data);
    }
  }

  return (
    <Box className={classes.tableContainer}>
      <Box className={classes.title}>
        <Typography variant='h5' component="div">普通用户</Typography>
      </Box>
      <Divider/>
      <Box>
        <DataGrid
          sx={{ border:'none',m:"0 2em"}} 
          rows={userList} 
          columns={col} 
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          rowsPerPageOptions={[5,10, 20, 50]}
          pagination
          autoHeight
          checkboxSelection
          rowCount={count}
        />
      </Box>
    </Box>
  )
}

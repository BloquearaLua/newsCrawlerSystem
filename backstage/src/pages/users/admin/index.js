import React,{ useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Divider, Modal } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Search, SearchIconWrapper, StyledInputBase} from '../../../component/Container/Search';
import { FormControl, Select, InputLabel, MenuItem, Button, TextField, Link, Grid, Box, Typography } from '@mui/material';
import { axiosDelete, axiosGet, axiosPost } from '../../../util/https';
import axios from 'axios';

const useStyles = makeStyles({
  tableContainer:{
      marginTop: "-60px",
      border: "solid 1px #e3f2fd",
      borderRadius: '10px',
      backgroundColor: "#fff",
      width: 'auto',
      // height: "auto"
  },
  title: {
      padding: '1em',
      width: "18em"
  },
  second: {
    padding: '0.5em 2em',
    display: "flex",
  },
  search:{
      // '&:hover':{
      //     border: '1px solid #616161'
      // }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: 24,
    borderRadius: "10px",
    padding: "20px 30px 30px",
  }
});

const genderText = ['保密','女','男'];
const roleType = {
  1: "管理员",
  2: "普通用户"
};
export default function Admin(props) {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [gender, setGender] = useState(0);
  const [errors, setErrors] = useState({});
  const [open,setOpen] = useState(false);
  const [list,setList] = useState([]);
  const [count,setCount] = useState(0);
  const [pageSize,setPageSize] = useState(10);

  const token = localStorage.getItem("adminToken");
  const classes = useStyles();
  const addRef = useRef(null);
  const col = [
      { field: 'username', headerName: '用户名', width: 180 },
      { field: 'email', headerName: '邮箱', width: 180 },
      { field: 'gender', headerName: '性别',type: 'date', width: 180 },
      { field: 'type', headerName: '用户类别', width: 180 },
      { field: 'createTime', headerName: '创建时间', width: 180 },
      { field: 'options', headerName: '操作', type: 'actions', width: 180, 
        getActions: (params) => [<GridActionsCellItem onClick={() => handleDelete(params.id)}  icon={<DeleteIcon />} label="Delete" />]
      },
  ];

  useEffect(() => {
    (async () => {
      const result = await axiosGet("/api/backstage/users/roleId=1");
      const data = handleData(result.data);
      console.log(data);
      setList(data);
      setCount(result.count);
    })();
  },[])

  const handleData = (result) => {
    const len = result.length;
    const data = new Array();
    for (let i = 0; i < len; i++) {
      data.push({
        id: result[i].id,
        username: result[i].username,
        email: result[i].email,
        gender: genderText[result[i].gender],
        type: roleType[result[i].role_id],
        createTime: moment(result[i].create_date).format("YYYY/MM/DD")
      })
    }
    return data;
  }

  const onSubmit = async() => {
    try {
      const result = await axiosPost(`/api/users`,{
          user:{
            username,
            password,
            email,
            gender,
            role_id: 1
        }});
      setErrors({});
      console.log(result);
      const data1 = handleData([result])
      setList([...data1,...list])
      setOpen(false);
      setEmail('');
      setPassword('');
      setGender(0);
      setUsername('');
    } catch (error) {
      setErrors(error.data.errors)
      console.log(error.data);
    }
  }

  const handleAdd = () => {
    setOpen(true);
  }

  const handleDelete = async(id) => {
    console.log(id);
    try {
      setTimeout(() => {
        setList(
          list.filter((item) => (item.id !== id))
        );
      })
      await axiosDelete(`/api/user`,{userid: id},token);
    } catch (error) {
      console.log(error.data);
    }
  }
  return (
    <Box className={classes.tableContainer}>
      <Box className={classes.title}>
        <Typography variant='h5' component="div">管理员</Typography>
      </Box>
      <Divider/>
      <Box className={classes.second}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
          添加管理员
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            添 加 管 理 员
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} autoComplete="off" ref={addRef}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="username"
                  label="用户名"
                  helperText={errors?.username ? errors.username : null}
                  error={Boolean(errors?.username)}
                  onChange={(e) => setUsername(e.target.value)}
                  value = {username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="password"
                  label="密码"
                  helperText={errors?.password ? errors.password : null}
                  type="password"
                  error={Boolean(errors?.password)}
                  onChange={(e) => setPassword(e.target.value)}
                  value = {password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="email"
                  label="邮箱"
                  helperText={errors?.email ? errors.email : null}
                  type="email"
                  error={Boolean(errors?.email)}
                  onChange={(e) => setEmail(e.target.value)}
                  value = {email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="gender-label">性别</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    // {...register("gender",{required:true})}
                    label="Gender"
                  >
                    {
                      genderText.map((item,i) => <MenuItem value={i} key={item}>{item}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" type='submit' sx={{mt:2}} color="secondary">添 加</Button>
          </Box>
        </Box>
        </Box>
      </Modal>
      <Box>
        <DataGrid
          sx={{ border:'none',m:"0 2em"}} 
          rows={list} 
          columns={col} 
          rowsPerPageOptions={[5,10, 20, 50]}
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          pagination
          autoHeight
          checkboxSelection
          rowCount={count}
        />
      </Box>
    </Box>
  )
}

import React,{ useEffect, useState} from 'react';
import { CssBaseline, Box, Container, TextField, Button, FormControl, Select, InputLabel, MenuItem, Grid, Typography, Avatar, Paper  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { axiosPost, axiosGet } from '../../../util/https'

const genderText = ['保密','女','男']
export default function Profile() {
  const [errors,setErrors] = useState({});
  const [gender, setGender] = useState(0);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [description,setDesription] = useState('');

  const token = localStorage.getItem("token");

  const onSubmit = async(e) => {
    e.preventDefault(false);
    try {
      await axiosPost(`/api/user`,{user: {
        username,
        email,
        gender,
        description}},token);
      setErrors(null);
      alert("修改成功")
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }

  useEffect(()=>{
    (async() => {
      try {
        const res = await axiosGet(`/api/user`,token);
        // console.log(res.user[0]);
        const user = res.user[0];
        setUsername(user.username);
        setEmail(user.email);
        setGender(user.gender);
        setDesription(user.description);
      } catch (error) {
        console.log(error.response);
      }
    })();
  },[])
  
  return (
    <Grid container component='div' 
          sx={{
              display:"flex",
              alignItems:"center",
              justifyContent: "center",
              height: '90vh'
            }}>
      <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6} square >
        <Box
          sx={{
            my: 3,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{bgcolor:'primary.main'}}>

          </Avatar>
          <Typography component="h1" variant="h5">
            修改个人资料
          </Typography>
          <Box component="form" 
                onSubmit={onSubmit} 
                sx={{ mt: 3 }} 
                autoComplete="off"
                noValidate
                >
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="username"
                  label="用户名"
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  helperText={errors?.username ? errors.username : null}
                  error={Boolean(errors?.username)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="email"
                  label="邮箱"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors?.email ? errors.email : null}
                  error={Boolean(errors?.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="gender-label">性别</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
                    {
                      genderText.map((item,i) => <MenuItem value={i} key={item}>{item}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  margin='normal'
                  id="description"
                  label="个性签名"
                  type="text"
                  name="description"
                  // {...register("description")}
                  onChange={(e) => setDesription(e.target.value)}
                  value={description}
                />
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" type='submit' sx={{mt:2}}>确 认 修 改</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

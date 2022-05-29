import React,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import pubsub from 'pubsub-js';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { axiosPost } from '../../util/https';

const useStyles = makeStyles({
  main:{
    width: "100vh",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default function Login() {
  const [errors,setErrors] = useState({});
  const { register,handleSubmit } = useForm();
  const navigate = useNavigate();
  const classes = useStyles();
  
  const onSubmit = async(data) => {
    console.log(data);
    const { username, password } = data;
    try {
      const res = await axiosPost(`/api/users/login`,{
        user:{
          username,
          password,
          roleid: 1
        }
      });
      console.log(res.token);
      setErrors({});
      localStorage.setItem("adminToken",res.token);
      navigate('/crawl/view');
    } catch (error) {
      setErrors(error.data.errors);
      localStorage.removeItem("adminToken");
    }
  }
  return (
    <Grid container component='div' 
          sx={{
              display:"flex",
              alignItems:"center",
              justifyContent: "center",
              height: '100vh'
            }}>
      <Grid item xs={10} sm={8} md={3} component={Paper} elevation={6} square >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{m:1, bgcolor:'primary.main'}}>

          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
          <Box 
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{mt:1}}
            autoComplete="on"
            >
              <TextField
                required
                fullWidth
                margin='normal'
                id="username"
                label="用户名"
                autoFocus
                helperText={errors.username ? errors.username : null}
                {...register("username",{required:true})}
                // variant="standard"
                error={Boolean(errors.username)}
              />
              <TextField
                required
                fullWidth
                margin='normal'
                id="password"
                label="密码"
                autoFocus
                helperText={errors.password ? errors.password : null}
                {...register("password",{required:true})}
                type="password"
                error={Boolean(errors.password)}
              />
              <Button variant="contained" type='submit' fullWidth sx={{mt:3}}>登&nbsp;&nbsp;&nbsp;录</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

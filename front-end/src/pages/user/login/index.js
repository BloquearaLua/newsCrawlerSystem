import React,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import pubsub from 'pubsub-js';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';

import { axiosPost } from '../../../util/https'

export default function Login() {
  const [errors,setErrors] = useState({});
  const { register,handleSubmit } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const onSubmit = async(data) => {
    console.log(data);
    const { username, password } = data;
    try {
      const res = await axiosPost(`/api/users/login`,{
        user:{
          username,
          password,
          roleid:2
        }
      });
      setErrors({});
      console.log("login", res);
      localStorage.setItem("token",res.token);
      localStorage.setItem("username",res.username);
      navigate('/news');
      pubsub.publish('login',{success:true});
    } catch (error) {
      setErrors(error.data.errors);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }
  return (
    <Grid container component='div' sx={{mt:7}}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              <Grid container sx={{mt:3}} justifyContent="flex-end">
                <Grid item >  
                  <Link href="/register" variant='body2' underline='none'>
                    还没有账号，注册一个？
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

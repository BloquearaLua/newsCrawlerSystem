import React,{ useState } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormControl, Select, InputLabel, MenuItem, Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@material-ui/styles';
import { axiosPost } from '../../../util/https';

const genderText = ['保密','女','男']
export default function Register() {
  const { register,handleSubmit } = useForm();
  const navigate = useNavigate();
  const [gender, setGender] = useState(0);
  const [errors, setErrors] = useState({});

  const onSubmit = async(data) => {
    // console.log("submit",data);
    try {
      await axiosPost(`/api/users`,{
          user:{
            username: data.username,
            password: data.password,
            email: data.email,
            gender
        }});
      setErrors({});
      navigate("/login");
    } catch (error) {
      setErrors(error.data.errors)
    }
  }
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
            注册
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin='normal'
                  id="username"
                  label="用户名"
                  helperText={errors?.username ? errors.username : null}
                  {...register("username",{required:true})}
                  error={Boolean(errors?.username)}
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
                  {...register("password",{required:true})}
                  type="password"
                  error={Boolean(errors?.password)}
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
                  {...register("email",{required:true})}
                  type="email"
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
            <Button fullWidth variant="contained" type='submit' sx={{mt:2}}>注册</Button>
            <Grid container justifyContent="flex-end" sx={{mt:3}}>
              <Grid item>
                <Link href="/login" variant="body2">
                  已经有账号了，直接登录
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

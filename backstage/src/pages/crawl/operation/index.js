import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';


export default function Operation() {
  const [crawlTime, setCrawlTime] = useState('06:00 pm');
  return (
    <Box
      sx={{
        m: "-55px 10px 10px",
        border: "solid 1px #e3f2fd",
        borderRadius: '10px',
        bgcolor: "#fff",
        width: 'auto',
        height: "500px"
      }}
    >
      <Box sx={{p:'1.2em'}}>
        <Typography variant='h5' component="div">操作</Typography>
        <Divider/>
        <Box sx={{display:"flex", mt:2}}>
          <Box sx={{ml:2}}>
            <Typography sx={{mb:1}}>
              设置爬虫时间：
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Basic example"
                value={crawlTime}
                onChange={(newValue) => {
                  setCrawlTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

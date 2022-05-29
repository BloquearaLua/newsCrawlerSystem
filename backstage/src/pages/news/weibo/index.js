import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import Table from '../../../component/Container/Table';
import { axiosGet } from '../../../util/https';

export default function Weibo() {
  const [newsList,setNewsList] = useState([]);
  const [rowCount,setRowCount] = useState(5);
  const page = 1;
  const pageSize = 5;
  useEffect(() => {
      handleGet(page,pageSize);
  },[]);
  
  const handleGet = async (page,pageSize) => {
    const result = await axiosGet(`/api/news?source_id=1&&page=${page}&&pageSize=${pageSize}`);
    setNewsList(result.data);
    const  count = result.count;
    setRowCount(count);
  }

  return (
    <Box sx={{mt:'-60px'}}>
      <Table newsList={newsList} rowCount={rowCount} handleGet={handleGet} title="新浪新闻"></Table>
    </Box>
  )
}

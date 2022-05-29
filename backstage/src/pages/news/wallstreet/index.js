import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Table from '../../../component/Container/Table';
import { axiosGet } from '../../../util/https';

export default function Wallstreet() {
  const [newsList,setNewsList] = useState([]);
  const [rowCount,setRowCount] = useState(5);
  const page = 1;
  const pageSize = 5;
  useEffect(() => {
      handleGet(page,pageSize);
  },[]);
  
  const handleGet = async (page,pageSize) => {
    const result = await axiosGet(`/api/news?source_id=2&&page=${page}&&pageSize=${pageSize}`);
    // const data = handleData(result.data);
    // setNewsList([...newsList,...data]);
    setNewsList(result.data);
    const count = result.count;
    setRowCount(count);
  }

  return (
    <Box sx={{mt: '-60px'}}>
      <Table newsList={newsList} rowCount={rowCount} handleGet={handleGet} title={"华尔街见闻"}></Table>
    </Box>
  )
}

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Bar from './Bar'
import TotalPie from './Pie/totalPie'
import TodayPie from './Pie/todayPie'
import TodayWordCloud from './TodayWordCloud'
import TotalWordCloud from './TotalWordCloud'
import { axiosGet } from '../../util/https'
import { Box } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '50px',
    height: '300px',
    width: 'auto'
}));

export default function TextAnalysis() {
    const [analysisData, setAnalysisData] = useState({})

    useEffect(() => {
        (async() => {
            const result = await axiosGet('/api/news/analysis')
            setAnalysisData(result)
            console.log(result);
        })()
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <Bar data={analysisData.category}></Bar>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <TotalPie data={analysisData.sentiment}></TotalPie>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <TodayPie data={analysisData.todaySentiment}></TodayPie>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <TotalWordCloud data={analysisData.totalWord}></TotalWordCloud>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <TodayWordCloud data={analysisData.todayWord}></TodayWordCloud>
                    </Item>
                </Grid>
            </Grid>
        </Box>
  )
}

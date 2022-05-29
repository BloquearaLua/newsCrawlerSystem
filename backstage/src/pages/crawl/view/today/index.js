import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

import { axiosGet } from '../../../../util/https';

const useStyles = makeStyles({
    detailsContainer:{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: '100%',
      borderRadius: "8px",
    },
    paper:{
      margin: "10px 10px",
      minHeight: "130px",
      padding:"20px 0",
      paddingLeft:"30px",
      borderRadius: "10px !important"
    }
})

export default function Today() {
    const [yesterday,setYesterday] = useState({wallCount:0,weiboCount:0});
    const [prevDay,setPrevDay] = useState({wallCount:0,weiboCount:0});
    const [total,setTotal] = useState({wallCount:0,weiboCount:0});
    const classes = useStyles();


    useEffect(() => {
        (async () => {
          const result = await axiosGet('/api/backstage/details');
          console.log("result:",result);
          setYesterday({
            wallCount: result?.last.wallstreet_count,
            weiboCount: result?.last.weibo_count
          });
          setPrevDay({
            wallCount: result?.prev.wallstreet_count,
            weiboCount: result?.prev.weibo_count
          });
          setTotal({
            wallCount: result.wallCount,
            weiboCount: result.weiboCount,
            userCount: result.userCount,
            viewsCount: result.viewsCount,
            likesCount: result.likesCount
          })
        })()
      },[])

    const list = [
      {
        id: 1,
        bgcolor: "#5e35b1",
        name:"爬虫总数",
        data:yesterday.wallCount+yesterday.weiboCount,
        subtitle: " yesterday",
        subData: prevDay.wallCount+prevDay.weiboCount,
        subtitle2: "Two days ago"
      },
      {
        id: 2,
        bgcolor: "#1e88e5",
        name: "新浪总数",
        data: yesterday.weiboCount,
        subtitle: " yesterday",
        subData: prevDay.weiboCount,
        subtitle2: "Two days ago"
      },
      {
        id: 3,
        bgcolor: "#d84315",
        name: "华尔街总数",
        data: yesterday.wallCount,
        subtitle: " yesterday",
        subData: prevDay.wallCount,
        subtitle2: "Two days ago"
      },
      {
        id: 4,
        bgcolor: "#29314f",
        name: "用户总数",
        data: total.userCount
      },
      {
        id: 5,
        bgcolor: "#7d576a",
        name: "新浪总数",
        data: total.weiboCount
      },
      {
        id: 6,
        bgcolor: "#a06940",
        name: "华尔街总数",
        data: total.wallCount
      },
      {
        id: 7,
        bgcolor: "#2d6767",
        name: "总浏览量",
        data: total.viewsCount
      },
      {
        id: 8,
        bgcolor: "#d17e83",
        name: "总点赞量",
        data: total.likesCount
      }
    ]
    return (
        <Grid container className={classes.detailsContainer}>
            {
              list.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Paper className={classes.paper} sx={{bgcolor:`${item.bgcolor}`,color:"snow"}} elevation={10}>
                    <Typography component="div">
                      {item.name}
                      <Typography variant='h4' component="div">
                        {item.data}
                        {
                          item.subtitle ? <Typography variant='subtitle2' component={"span"}>{item.subtitle}</Typography> : null
                        }
                        {
                          item.subtitle2 ? <Typography variant='subtitle2'>{item.subData}{" "+item.subtitle2}</Typography> : null
                        }
                        
                      </Typography>
                    </Typography>
                  </Paper>
                </Grid>
              ))
            }
        </Grid>
    )
}

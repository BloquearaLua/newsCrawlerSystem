import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Card, CardContent, Typography, Link, IconButton, Grid, Divider  } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { axiosGet, axiosPost, axiosDelete } from '../../util/https'
import { category_zh } from '../../constant'

const stopword = ['.',',','%','...','…']
export default function NewsInfo() {
  const [news,setNews] =  useState([]);
  const [isLiking,setIsLiking] = useState(false);
  const {newsId} = useParams();

  const token = localStorage.getItem("token");
  useEffect(()=>{
    (async ()=>{
      try{
        // 获取新闻
        const res1 = await axiosGet(`/api/news/id=${newsId}`);
        const newsMsg = handleNews(res1[0])
        setNews(newsMsg)
        console.log("news",newsMsg);

        if(token){
          // 获取该文章是否被喜欢
          const res2 = await axiosGet(`/api/record/like?newsid=${newsId}`,token)
          // console.log(res2);
          setIsLiking(res2.isLiking);

          // 增加浏览记录
          // const res3 = await axiosPost(`/api/record/views`,{newsId},token);
          // console.log(res3);
        }
      }catch (error) {
        console.log(error.response);
      }
    })();
  },[]);

  const handleNews = (news) => {
    let keywords = '', content = [], title = '', date = ''
    if (news.keywords) {
      const keywordsList = news.keywords.split(',').filter((item) => !stopword.includes(item))
      keywords = keywordsList[0]+', '+keywordsList[1]+', '+keywordsList[2]
    }
    if (news.content) {
      content = news.content.split("　　")
    }
    if (news.title) {
      title = news.title.split('|')[0]
    }
    if (news.publish_date) {
      date = moment(news.publish_date).format('YYYY-MM-DD')
    }
    const info = {
      date,
        source: news.source,
        author: news.author,
        category: news.category,
        sentiment: news.sentiment === 0 ? '中立' : (news.sentiment < 0 ? '负面' : '正面'),
        keywords,
      title,
      content,
      url: news.url,
      summary: news.summary.split('_')[0]
    }
    return info
  }
  
  const handleLike = async() => {
    if(token){
      try {
        setIsLiking(true);
        const res = await axiosPost(`/api/record/like`,{newsId},token);
        console.log(res);
      } catch (error) {
        // pubsub("overdue1","like is overdue");
      }
    }else{
      alert(`您还没登录呢，请先登录!`)
    }
  }
  const handleUnLike = () => {
    if(token){
      try {
        setIsLiking(false);
        axiosDelete('/api/record/like',{newsId},token);
      } catch (error) {
        // pubsub("overdue2","unlike is overdue")
      }
    }else{
      alert(`您还没登录呢，请先登录!`)
    }
  }

  return (
    <Card sx={{ 
            m: '40px 100px', 
            p: '15px 60px',
            minWidth: 'xs'
          }}>
      <CardContent>
        {
          news.source && <Typography variant="subtitle1" gutterBottom>
            From {news.source}
          </Typography> 
        }
        <Divider />
        <br /> 
        <Typography variant="h6" color="text.secondary" component={'h1'} gutterBottom>
          <Link href={news.url} underline="none" color="black">{news.title}</Link>
          <IconButton sx={{ml: 2}} aria-label="like" onClick={isLiking ? handleUnLike : handleLike}>
            {
              isLiking ? 
              <ThumbUpIcon /> : 
              <ThumbUpOutlinedIcon /> 
            }
          </IconButton>
        </Typography>
        <Typography component="div" sx={{ display: "flex", fontSize: 14, mt:1 }} color="text.secondary">
          <Grid container>
            <Typography variant="subtitle1" component="div">
            {( news.date || news.author) && <i>{news.date} BY {news.author}</i>}
            </Typography>
          </Grid>
        </Typography>
        {
          news.summary && <Typography component='div' sx={{width: '100%', height: 'auto', mt:1, backgroundColor: 'rgb(215, 216, 216)', borderRadius: '5px', padding: '10px 10px'}}>
            <i>
              <Typography component="div" variant='subtitle2' sx={{fontSize: '16px'}}>{news.summary}</Typography>
            </i>
          </Typography>
        }
        <Typography variant="body2" sx={{fontSize:16,mt:1}} component='div'>
          {
            news.content && news.content.map((item,i) => {
              if(item === "") return "";
              return <Typography variant="body1" component="p" key={`${item}+${i}`} sx={{lineHeight: '30px'}}>&emsp;&emsp;{item}</Typography>;
            })
          }
        </Typography>
        <br />
        <Divider />
        <Typography variant="subtitle1" component="div" sx={{mt: 1}}>
          {
            news.category && <i>分类：{category_zh[news.category]}；</i>
          }
          {
            news.sentiment && <i>情感偏向：{news.sentiment}；</i>
          }
          {
            news.keywords && <i>关键词：{news.keywords}；</i>
          }
        </Typography>
      </CardContent>
    </Card>
  );
}


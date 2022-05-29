import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@mui/material';
import { axiosGet } from '../../util/https';

export default function RecordContainer(props) {
    const [newsList,setNewsList] = useState([]);
    const navigate = useNavigate();    
    const token = localStorage.getItem("token");
    const pageSize = 10;
    let page = 1, totalCount = 10, count = 0;
    const { url } = props;

    useEffect(() => {
        let isMount = true;
        (async() => {
            try {
                if(url){
                    const result =await axiosGet(`${url}?page=1&&pagesize=${totalCount}`,token);
                    if(result && isMount){
                        console.log(result);
                        setNewsList(result.data);
                        // setCount(result.count);
                        count = result.count;
                    }
                    window.addEventListener('scroll',handleScroll);
                }
            } catch (error) {
                console.log(error.data);
            }
        })();
        return () => {
            isMount = false;
            window.removeEventListener('scroll',handleScroll);  
        }
    },[])

    const handleScroll = async () => {
        const scrollTop = document.documentElement.scrollTop ? 
            document.documentElement.scrollTop : 
            document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight ? 
            document.documentElement.clientHeight : 
            document.body.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight ?
            document.documentElement.scrollHeight : 
            document.body.scrollHeight;
        if(scrollHeight-scrollTop-clientHeight <= 10){
            console.log("????");
            window.removeEventListener('scroll',handleScroll);
        
            try {
                if(url){
                    page = page+1;
                    totalCount = (page)*pageSize<count ? (page)*pageSize : count;
                    console.log(count,page,totalCount);
                    const result = await axiosGet(`${url}?page=1&&pagesize=${totalCount}`,token);
                    setNewsList(result.data);
                    
                    if(totalCount < count){
                        window.addEventListener('scroll',handleScroll);
                    }
                }
            } catch (error) {
                if(error?.data?.msg === "token过期了"){
                    // console.log('guoqile');
                    navigate('/login');
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    alert('登录信息已过期，请重新登录')
                  }
                }
            }
        }
    return (
        <List sx={{mt:3}}>
            {
                newsList.map(item => {
                    let date = moment.utc(item.update_time).local().format('YYYY-MM-DD hh:mm:ss');
                    if(!date){
                        date = null;
                    }
                    let author = item.author;
                    if(!author){
                        author = 'A';
                    }
                    return (<ListItem
                        onClick={() => navigate(`/details/${item.id}`)}  
                        key={item.id}
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: '12px',
                            boxShadow: 1,
                            fontWeight: 'bold',
                            mb:2,
                            cursor: 'pointer'
                        }}>
                        <ListItemAvatar>
                            <Avatar alt="author_name" sx={{width:50,height:50,mr:3}}>{author[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography 
                                    sx={{ display: 'block'}}
                                    component="div"
                                    variant='h6'
                                    color="black"
                                    noWrap
                                >
                                    {item.title}
                                </Typography>
                            }
                            secondary={
                                <Typography 
                                    sx={{
                                        display: "inline-block",
                                        width: '100%'
                                    }}
                                    component="span"
                                    variant="body2"
                                    color="GrayText"
                                    noWrap
                                >
                                    {`时间：${date}`}&nbsp;&nbsp;{item.summary}
                                </Typography>
                            }
                        >
                        </ListItemText>
                        </ListItem>)
                    }
                )
            }
        </List>      
    )
}

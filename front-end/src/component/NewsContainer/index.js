import React, { useState,useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Container } from '@mui/material';

import NewsCard from './NewsCard';
import { axiosGet } from '../../util/https'

export default function NewsContainer(props) {
    const { url } = props;
    console.log("url",url);
    const [newsList,setNewsList] = useState([]);
    const pageSize = 20;
    let page = 1, totalCount = 20;
    let count = 0;

    useEffect(() => {
        let isMount = true;
        try {
            (async() => {
                const result =await axiosGet(`${url}page=1&&pageSize=${totalCount}`);
                if(result && isMount){
                    console.log(result);
                    setNewsList(result.data);
                    count = result.count;
                    window.addEventListener('scroll',handleScroll)
                  }
            })();
        } catch (error) {
            console.log(error);
        }
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
        // console.log("scrollTop ",scrollTop);
        // console.log("clientHeight ",clientHeight);
        // console.log("scrollHeight ",scrollHeight);
        if(scrollHeight-scrollTop-clientHeight <= 10){
            window.removeEventListener('scroll',handleScroll);

            try {
                page += 1;
                totalCount = page*pageSize<count ? page*pageSize : count;
                const result = await axiosGet(`${url}page=1&&pageSize=${totalCount}`);
                setNewsList(result.data);
                if(totalCount < count){
                    window.addEventListener('scroll',handleScroll);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <Container sx={{mt:5}}>
            <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    newsList.length ? newsList.map(item => (<NewsCard  item={item} key={item.id}></NewsCard>)) : null
                } 
            </Masonry>
        </Container>
    )
}

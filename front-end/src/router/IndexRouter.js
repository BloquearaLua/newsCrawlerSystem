import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewsInfo from '../component/NewsInfo';
import News from '../pages/news';
import WeiboNews from '../pages/news/weibo';
import WallStreet from '../pages/news/wallstreet';
import SearchResult from '../pages/news/searchNews';
import Views from '../pages/records/views';
import Likes from '../pages/records/likes';
import Profile from '../pages/user/profile';
import Login from '../pages/user/login';
import Register from '../pages/user/register';
import TextAnalysis from '../pages/analysis'

export default function IndexRouter() {
  return (
        <Routes>
            <Route path='news' element={<News />} />
            <Route path='news/keyword=:keyword' element={<SearchResult/>} />
            <Route path='weibonews' element={<WeiboNews/>} />
            <Route path='wallstreet' element={<WallStreet/>} />
            <Route path='details/:newsId' element={<NewsInfo />} />

            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />}/>

            <Route path='profile' element={<Profile/>} />

            <Route path='views' element={<Views/>} />
            <Route path='likes' element={<Likes/>} d/>

            <Route path='analysis' element={<TextAnalysis/>} />

            <Route path="*" element={<Navigate to="/news" />} />
        </Routes>
  )
}

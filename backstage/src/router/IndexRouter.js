import React from 'react';
import { Routes,Route } from 'react-router-dom';

import Login from '../pages/login';
import SandBox from '../pages/index';
import View from '../pages/crawl/view'

export default function IndexRouter() {
  const token = localStorage.getItem("adminToken");
  const comp = token ? <SandBox/> : <Login/>;
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={comp}/>
    </Routes>
  )
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Operation from '../pages/crawl/operation';
import View from '../pages/crawl/view';
import Wallstreet from '../pages/news/wallstreet';
import Weibo from '../pages/news/weibo';
import Admin from '../pages/users/admin';
import Common from '../pages/users/common';

export default function CrawlRouter() {
  return (
    <Routes>
        <Route path="crawl">
          <Route path="operation" element={<Operation />}></Route>
          <Route path="view" element={<View />}></Route>
        </Route>
        <Route path="news">
          <Route path="wallstreet" element={<Wallstreet />}></Route>
          <Route path="weibo" element={<Weibo />}></Route>
        </Route>
        <Route path="users">
          <Route path="admin" element={<Admin />}></Route>
          <Route path="common" element={<Common/>}></Route>
        </Route>
        <Route path="*" element={<View/>}></Route>
    </Routes>
  )
}

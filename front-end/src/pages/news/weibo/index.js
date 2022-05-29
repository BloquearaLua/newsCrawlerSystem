import React from 'react';

import NewsContainer from '../../../component/NewsContainer';

export default function Weibo() {
  const url =  `/api/news?source_id=1&&`;
  return (
    <NewsContainer url={url}></NewsContainer>
  )
}

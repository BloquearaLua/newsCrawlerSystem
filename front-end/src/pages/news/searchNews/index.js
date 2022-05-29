import React from 'react';
import { useParams } from 'react-router-dom';

import NewsContainer from '../../../component/NewsContainer';

 
export default function SearchResult() {
  const {keyword} = useParams();
  let  url = `/api/news?keyword=${keyword}&&`
  return (
    <NewsContainer url={url}></NewsContainer>
  )
}

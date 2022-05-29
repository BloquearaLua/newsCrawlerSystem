
import React from 'react';

import NewsContainer from '../../../component/NewsContainer';

export default function WallStreet() {
  const url = `/api/news?source_id=2&&`;
  return (
    <NewsContainer url={url}></NewsContainer>
  )
}

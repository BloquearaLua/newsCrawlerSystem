import React from 'react';
import NewsContainer from '../../component/NewsContainer';

export default function News() {
    const url = '/api/news?';
    return (
        <NewsContainer url={url}></NewsContainer>
    )
}

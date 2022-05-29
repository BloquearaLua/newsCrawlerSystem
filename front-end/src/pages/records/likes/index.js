import React from 'react';
import RecordContainer from '../../../component/RecordContainer';

export default function Likes() {
  const url = `/api/record/mylikes`;

  return (
    <RecordContainer url={url}></RecordContainer>
  )
}

import React, { useEffect, useState } from 'react';

import RecordContainer from '../../../component/RecordContainer';
import { axiosGet } from '../../../util/https'

export default function Views() {
  const url = `/api/record/views`;
  return (
    <RecordContainer url={url}></RecordContainer>
  )
}

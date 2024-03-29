import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Charity from './charity';
import Institutions from './institutions';

function index(active: any) {

  const[activePage, setActivePage] = useState(0);

  useEffect(() => {
    if(active.active != null) setActivePage(active.active);
    else setActivePage(active);
  }, [active])
  
  return (
    <div className="mx-[15%] text-center border-x h-screen p-[2rem]">
      {
        activePage === 0 ? <Charity /> : <Institutions/>
      }
    </div>
  )
}

export default index
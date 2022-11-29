import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import About from './about';
import Contacts from './contacts';
import Partnerships from './partnerships';

function index(active: any) {

  const[activePage, setActivePage] = useState(0);

  useEffect(() => {
    if(active.active != null) setActivePage(active.active);
    else setActivePage(active);
  }, [active])
  
  return (
    <div className="mx-[15%] text-center border-x h-screen p-[2rem]">
      {
        activePage === 0 ? <About /> : activePage === 1 ? <Contacts /> : <Partnerships />
      }
    </div>
  )
}

export default index
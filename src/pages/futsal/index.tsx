import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import Futsal from './futsal'
import Statistics from './statistics'
import Tournaments from './tornaments'

function index(active: any) {

  const[activePage, setActivePage] = useState(0);

  useEffect(() => {
    if(active.active != null) setActivePage(active.active);
    else setActivePage(active);
  }, [active])
  
  return (
    <div className="mx-[15vw] text-center border-x h-screen p-[2rem]">
      {
        activePage === 0 ? <Futsal /> : activePage === 1 ? <Statistics /> : <Tournaments />
      }
    </div>
  )
}

export default index
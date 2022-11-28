import { Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <div className='flex py-10 text-center items-center justify-center'>
        <Typography variant="h2" className='font-medium text-tertiary'>
            Madeira Experience
        </Typography>
    </div>
  )
}

export default Header
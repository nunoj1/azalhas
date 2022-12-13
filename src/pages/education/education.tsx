import { Typography } from '@mui/material'
import React from 'react'
import PostsCard from '../../components/Cards/PostsCard'

function Education() {
  return (
    <div className='w-full'>
      <Typography className='text-xl font-bold m-4'>Últimas Noticias:</Typography>
      <PostsCard categoryId={3} mainEventId={0} isHome={false}/>
    </div>
  )
}

export default Education
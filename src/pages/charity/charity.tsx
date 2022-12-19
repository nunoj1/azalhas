import { Typography } from '@mui/material'
import React from 'react'
import PostsCard from '../../components/Cards/PostsCard'

function Charity() {
  return (
    <div className='w-full'>
      <PostsCard categoryId={4} mainEventId={0} isHome={false}/>
    </div>
  )
}

export default Charity
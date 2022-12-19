import { Typography } from '@mui/material'
import React from 'react'
import PostsCard from '../../components/Cards/PostsCard'

function Education() {
  return (
    <div className='w-full'>
      <PostsCard categoryId={3} mainEventId={0} isHome={false}/>
    </div>
  )
}

export default Education
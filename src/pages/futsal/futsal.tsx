import { Typography } from '@mui/material'
import React from 'react'
import GamesInfoCard from '../../components/Cards/GamesInfoCard'
import PostsCard from '../../components/Cards/PostsCard'
import TournamentInfoCard from '../../components/Cards/TournamentInfoCard'

function Futsal() {

    return (
        <div className='w-full'>
            <div className='w-full col-span-3 col-start-2 rounded-sm flex flex-row' >
                <GamesInfoCard />
                <TournamentInfoCard />

            </div>
            <Typography className='text-xl font-bold m-4'>Últimas Noticias:</Typography>
            <PostsCard categoryId={1} mainEventId={0} isHome={false} />
        </div>
    )
}

export default Futsal
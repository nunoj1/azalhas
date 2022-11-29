import React from 'react'
import GamesInfoCard from '../../components/Cards/GamesInfoCard'
import TournamentInfoCard from '../../components/Cards/TournamentInfoCard'

function Futsal() {
    
    return (
        <div className='w-full'>
            <div className='w-full col-span-3 col-start-2 rounded-sm flex flex-row' >
                <GamesInfoCard/>
                <TournamentInfoCard/>
            </div>
        </div>
    )
}

export default Futsal
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc';
import { Games, Teams, Tournaments } from '@prisma/client';

interface Props {
    gameId: number;
}

function SingleGameInfoCard(props: Props) {

    const [gameData, setGameData] = useState<(Games & {
        tournament: Tournaments | null;
        team1: Teams;
        team2: Teams;
    }) | null>();
    const { data: itemsData, isLoading } = trpc.games.getGameById.useQuery({ id: props.gameId });

    useEffect(() => {
        if (itemsData != null) {
            setGameData(itemsData);
        }
    }, [itemsData])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-tlitem');
                }
                else {
                    entry.target.classList.remove('show-tlitem');
                }
            });
        })

        const hiddenElements = document.querySelectorAll('.hide-tlitem');
        hiddenElements.forEach((el) => observer.observe(el));
    }, [gameData])


    if (isLoading || gameData === undefined) return <div>Loading...</div>
    return (
        <div className='m-[6px] flex flex-col justify-center items-center p-5 rounded-sm hide-tlitem'>
            <div className='flex flex-row justify-center items-center gap-5'>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={gameData?.team1?.picture ?? ''} />
                    <Typography className='font-extrabold text-md' >{gameData?.team1?.name}</Typography>
                </div>
                <div className='row-start-2'>
                    {
                        gameData !== undefined && gameData?.date != null && gameData?.date < new Date() ?
                            <Typography className='text-sm font-extrabold'>Resultado:</Typography> :
                            <Typography className='text-sm font-extrabold'>Inicio:</Typography>
                    }
                    {
                        gameData !== undefined && gameData?.date != null && gameData?.date < new Date() ?
                            <Typography className='font-extrabold text-xl py-5' >{gameData?.team1Result} - {gameData?.team2Result}</Typography> :
                            <Typography className='font-extrabold text-xl py-5' >{gameData?.date?.toLocaleTimeString()}</Typography>
                    }
                    <Typography className='text-sm font-extrabold'>{gameData?.location}</Typography>
                    <Typography className='text-sm text-gray-400 font-extrabold'>{gameData?.tournament?.tournamentName}</Typography>
                </div>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={gameData?.team2?.picture ?? ''} />
                    <Typography className='font-extrabold text-md' >{gameData?.team2?.name}</Typography>
                </div>
            </div>
        </div>
    )
}

export default SingleGameInfoCard
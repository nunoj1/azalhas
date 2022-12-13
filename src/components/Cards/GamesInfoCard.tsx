import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { trpc } from '../../utils/trpc';
import { Game } from '../../types/trpc-types';

function GamesInfoCard() {

    const [selectedGame, setSelectedGame] = useState<number>(0);
    const [selectedGameData, setSelectedGameData] = useState<Game>();

    const { data: itemsData, isLoading } = trpc.games.getGames.useQuery();

    useEffect(() => {
        if (itemsData != null && itemsData != undefined) {
            let i = 0;
            itemsData.forEach((item) => {if(item.date > new Date()) return; i++;})
            if (itemsData[i] != null) {
                let data: any = itemsData[i];
                setSelectedGame(i);
            }
        }
    }, [itemsData])

    useEffect(() => {
        if (itemsData != null && itemsData != undefined) {
            if (itemsData[selectedGame] != null) {
                let data: any = itemsData[selectedGame];
                setSelectedGameData(data);
            }
        }
    }, [selectedGame])

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
    }, [selectedGameData])

    if (!itemsData || isLoading) return <p>Loading...</p>
    return (
        <div className='m-[6px] flex flex-col justify-center items-center p-5 border min-w-[49%] h-[300px] rounded-sm hide-tlitem'>
            <div className='flex flex-row justify-center items-center gap-5'>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={selectedGameData?.team1?.picture ?? ''} />
                    <Typography className='font-extrabold text-md' >{selectedGameData?.team1?.name}</Typography>
                </div>
                <div className='row-start-2'>
                    <Typography className='text-sm font-extrabold'>{selectedGameData?.date?.toLocaleDateString()}</Typography>
                    {
                        selectedGameData !== undefined && selectedGameData?.date != null && selectedGameData?.date < new Date() ?
                            <Typography className='font-extrabold text-xl py-5' >{selectedGameData?.team1Result} - {selectedGameData?.team2Result}</Typography> :
                            <Typography className='font-extrabold text-xl py-5' >{selectedGameData?.date?.toLocaleTimeString()}</Typography>
                    }
                    <Typography className='text-sm font-extrabold'>{selectedGameData?.location}</Typography>
                    <Typography className='text-sm text-gray-400 font-extrabold'>{selectedGameData?.tournament?.tournamentName}</Typography>
                </div>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={selectedGameData?.team2?.picture ?? ''} />
                    <Typography className='font-extrabold text-md' >{selectedGameData?.team2?.name}</Typography>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-5'>
                <button disabled={selectedGame === 0} onClick={() => setSelectedGame(selectedGame - 1)}>
                    <ArrowBackIosIcon className={`${selectedGame === 0 ? 'svgDisabled' : ""}`} />
                </button>
                {/* {
                    selectedGameData !== undefined && selectedGameData?.date < new Date() ?
                        <button className='bg-tertiary text-white hover:bg-quaternary p-2 rounded'>Ver Resumo</button>
                        :
                        null
                } */}
                <button disabled={selectedGame >= itemsData.length - 1} onClick={() => setSelectedGame(selectedGame + 1)}>
                    <ArrowForwardIosIcon className={`${selectedGame >= itemsData.length - 1 ? 'svgDisabled' : ""}`} />
                </button>
            </div>
        </div>
    )
}

export default GamesInfoCard
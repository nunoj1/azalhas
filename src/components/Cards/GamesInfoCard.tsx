import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function GamesInfoCard() {

    const gamesData: any = [
        {
            team1Name: "Juventos",
            team2Name: "Sporting",
            team1ShortName: "JFC",
            team2ShortName: "SCP",
            team1Result: 6,
            team2Result: 1,
            pictureTeam1: "/equipas/juventus.jpg",
            pictureTeam2: "/equipas/sporting.jpg",
            date: new Date(2022, 11 - 1, 2),
            startTime: "22:00",
            location: "Estado dos Barreiros",
            tornament: "Taça da liga"
        },
        {
            team1Name: "Porto",
            team2Name: "Benfica",
            team1ShortName: "FCP",
            team2ShortName: "SLB",
            team1Result: 2,
            team2Result: 2,
            pictureTeam1: "/equipas/porto.png",
            pictureTeam2: "/equipas/benfica.png",
            date: new Date(2022, 12 - 1, 8),
            startTime: "19:00",
            location: "Ponte dos Frades",
            tornament: "Taça da liga"
        }
    ]

    const [selectedGame, setSelectedGame] = useState(0);
    const [selectedGameData, setSelectedGameData] = useState(gamesData[0]);


    useEffect(() => {
        if (gamesData[selectedGame] != null) setSelectedGameData(gamesData[selectedGame]);
    }, [selectedGame])

    return (
        <div className='m-auto flex flex-col justify-center items-center p-5 border w-[48%] h-[300px] rounded-sm border-tertiary'>
            <div className='flex flex-row justify-center items-center gap-5'>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={selectedGameData.pictureTeam1} />
                    <Typography className='font-extrabold text-md' >{selectedGameData.team1Name}</Typography>
                </div>
                <div className='row-start-2'>
                    <Typography className='text-sm font-extrabold'>{selectedGameData.date.toLocaleDateString()}</Typography>
                    {
                        selectedGameData.date < new Date() ?
                            <Typography className='font-extrabold text-xl py-5' >{selectedGameData.team1Result} - {selectedGameData.team2Result}</Typography> :
                            <Typography className='font-extrabold text-xl py-5' >{selectedGameData.startTime}</Typography>
                    }
                    <Typography className='text-sm font-extrabold'>{selectedGameData.location}</Typography>
                    <Typography className='text-sm text-gray-400 font-extrabold'>{selectedGameData.tornament}</Typography>
                </div>
                <div className='row-start-2'>
                    <img className='w-[150px] h-[150px] object-cover' src={selectedGameData.pictureTeam2} />
                    <Typography className='font-extrabold text-md' >{selectedGameData.team2Name}</Typography>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center gap-5'>
                <button disabled={selectedGame === 0} onClick={() => setSelectedGame(selectedGame - 1)}>
                    <ArrowBackIosIcon className={`${selectedGame === 0 ? 'svgDisabled' : ""}`} />
                </button>
                {
                    selectedGameData.date < new Date() ?
                        <button className='bg-tertiary text-white hover:bg-quaternary p-2 rounded'>Ver Resumo</button>
                        :
                        null
                }
                <button disabled={selectedGame >= gamesData.length - 1} onClick={() => setSelectedGame(selectedGame + 1)}>
                    <ArrowForwardIosIcon className={`${selectedGame >= gamesData.length - 1 ? 'svgDisabled' : ""}`} />
                </button>
            </div>
        </div>
    )
}

export default GamesInfoCard
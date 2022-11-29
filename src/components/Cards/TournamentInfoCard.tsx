import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function TournamentInfoCard() {

    const tournamentsData: any = [
        {
            tournamentName: "Taça de teste",
            teamsData: [
                {
                    teamName: "Sporting",
                    teamPicture: "/equipas/sporting.jpg",
                    teamPoints: 12,
                    teamVictories: 4,
                    teamDraws: 0,
                    teamLoses: 0,
                    teamPlacement: 1
                },
                {
                    teamName: "Benfica",
                    teamPicture: "/equipas/benfica.png",
                    teamPoints: 7,
                    teamVictories: 1,
                    teamDraws: 2,
                    teamLoses: 1,
                    teamPlacement: 2
                },
                {
                    teamName: "Juventus",
                    teamPicture: "/equipas/juventus.jpg",
                    teamPoints: 4,
                    teamVictories: 0,
                    teamDraws: 2,
                    teamLoses: 2,
                    teamPlacement: 3
                }
            ]
        },
        {
            tournamentName: "Taça da Liga",
            teamsData: [
                {
                    teamName: "Juventus",
                    teamPicture: "/equipas/juventus.jpg",
                    teamPoints: 3,
                    teamVictories: 1,
                    teamDraws: 0,
                    teamLoses: 0,
                    teamPlacement: 1
                },
                {
                    teamName: "Benfica",
                    teamPicture: "/equipas/benfica.png",
                    teamPoints: 2,
                    teamVictories: 0,
                    teamDraws: 1,
                    teamLoses: 0,
                    teamPlacement: 2
                },
                {
                    teamName: "Porto",
                    teamPicture: "/equipas/porto.png",
                    teamPoints: 2,
                    teamVictories: 0,
                    teamDraws: 1,
                    teamLoses: 0,
                    teamPlacement: 3
                }
            ]
        }
    ]

    const [selectedTournament, setSelectedTournament] = useState(tournamentsData.length - 1);
    const [selectedTournamentData, setSelectedTournamentData] = useState(tournamentsData[tournamentsData.length - 1]);


    useEffect(() => {
        if (tournamentsData[selectedTournament] != null) setSelectedTournamentData(tournamentsData[selectedTournament]);
    }, [selectedTournament])

    console.log(selectedTournamentData)

    return (
        <div className='m-auto flex flex-col justify-center items-center p-5 border w-[48%] h-[300px] rounded-sm border-tertiary'>
            <div className='flex flex-row justify-center items-center pb-4'>
                <button disabled={selectedTournament === 0} onClick={() => setSelectedTournament(selectedTournament - 1)}>
                    <ArrowBackIosIcon className={`${selectedTournament === 0 ? 'svgDisabled' : ""}`} />
                </button>
                <Typography variant='h6' className='font-extrabold mx-4'>{selectedTournamentData.tournamentName} - Top 3</Typography>
                <button disabled={selectedTournament >= tournamentsData.length - 1} onClick={() => setSelectedTournament(selectedTournament + 1)}>
                    <ArrowForwardIosIcon className={`${selectedTournament >= tournamentsData.length - 1 ? 'svgDisabled' : ""}`} />
                </button>
            </div>
            {/* Header */}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th><Typography className='font-extrabold'>Pos</Typography></th>
                        <th><Typography className='font-extrabold'>Clube</Typography></th>
                        <th><Typography className='font-extrabold'>P</Typography></th>
                        <th><Typography className='font-extrabold'>V</Typography></th>
                        <th><Typography className='font-extrabold'>E</Typography></th>
                        <th><Typography className='font-extrabold'>D</Typography></th>
                    </tr>
                </thead>
                {/* Results */}

                <tbody>

                    {selectedTournamentData.teamsData.map((team: any, index: any) => {
                        return <tr key={index}>
                            <td className='font-extrabold'>{team.teamPlacement}</td>
                            <td className='flex flex-row'><img className='w-7 h-7' src={team.teamPicture} />{team.teamName}</td>
                            <td className='font-extrabold'>{team.teamPoints}</td>
                            <td>{team.teamVictories}</td>
                            <td>{team.teamDraws}</td>
                            <td>{team.teamLoses}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button className='bg-tertiary text-white hover:bg-quaternary p-2 mt-3 rounded'>Mais Informação</button>
        </div >
    )
}

export default TournamentInfoCard
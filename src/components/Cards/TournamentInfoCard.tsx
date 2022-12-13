import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { trpc } from '../../utils/trpc';
import { Statistics, TournamentStatistics } from '../../types/trpc-types';

function TournamentInfoCard() {
    const { data: itemsData, isLoading } = trpc.tournaments.getTournamentsStats.useQuery();

    const [selectedTournament, setSelectedTournament] = useState(0);
    const [selectedTournamentData, setSelectedTournamentData] = useState<TournamentStatistics>();

    useEffect(() => {
        if(itemsData != null){
            if (itemsData[selectedTournament] != null) {
                setSelectedTournamentData(itemsData[selectedTournament]);
            }
        }
    }, [selectedTournament])

    useEffect(() => {
        if(itemsData != null){
            if (itemsData[selectedTournament] != null) {
                setSelectedTournament(getLastIndex())
            }
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
    }, [selectedTournamentData])

    const getLastIndex = () => {
        if(itemsData !== null && itemsData !== undefined){
            return itemsData.length - 1;
        }
        return 0;
    }

    return (
        <div className='m-[6px] flex flex-col justify-center items-center p-5 border min-w-[49%] h-[300px] rounded-sm hide-tlitem'>
            <div className='flex flex-row justify-center items-center pb-4'>
                <button disabled={selectedTournament === 0} onClick={() => setSelectedTournament(selectedTournament - 1)}>
                    <ArrowBackIosIcon className={`${selectedTournament === 0 ? 'svgDisabled' : ""}`} />
                </button>
                <Typography variant='h6' className='font-extrabold mx-4'>{selectedTournamentData?.tournament.tournamentName} - {selectedTournamentData?.tournament.tournamentFinished ? 'Terminado' : selectedTournamentData?.tournament.startDate && selectedTournamentData?.tournament.startDate > new Date() ? 'Por Iniciar' : 'Em Progresso'}</Typography>
                <button disabled={selectedTournament >= getLastIndex()} onClick={() => setSelectedTournament(selectedTournament + 1)}>
                    <ArrowForwardIosIcon className={`${selectedTournament >= getLastIndex() ? 'svgDisabled' : ""}`} />
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
                    {selectedTournamentData?.stats.map((stats: Statistics, index: any) => {
                        if(index > 2) return null
                        return <tr key={index}>
                            <td className='font-extrabold'>{selectedTournamentData.tournament.startDate && selectedTournamentData.tournament.startDate < new Date() ? stats.teamPlacement : '-'}</td>
                            <td className='flex flex-row'><img className='w-7 h-7' src={stats.team?.picture ?? ''} />{stats.team?.name}</td>
                            <td className='font-extrabold'>{stats.teamPoints}</td>
                            <td>{stats.teamWins}</td>
                            <td>{stats.teamDraws}</td>
                            <td>{stats.teamLoses}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button className='bg-tertiary text-white hover:bg-quaternary p-2 mt-3 rounded'>Mais Informação</button>
        </div >
    )
}

export default TournamentInfoCard
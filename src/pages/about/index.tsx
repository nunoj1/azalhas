import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc';
import About from './about';
import Contacts from './contacts';
import Partnerships from './partnerships';

const createDefaultValues = () => {

  const tournamentMutation = trpc.tournaments.createTournament.useMutation();
  const teamMutation = trpc.teams.createTeam.useMutation();
  const gameMutation = trpc.games.createGame.useMutation();
  const tournamentTeamMutation = trpc.tournaments.createTournamentTeam.useMutation();

  tournamentMutation.mutateAsync({ tournamentName: "Taça de teste", tournamentFinished: true, startDate: new Date(2022,11-1,2,22) });
  tournamentMutation.mutateAsync({ tournamentName: "Taça da Liga", tournamentFinished: true, startDate: new Date(2022,12-1,21,22) });

  teamMutation.mutateAsync({ name: "Juventos", shortName: "JFC", picture: "/equipas/juventus.jpg" });
  teamMutation.mutateAsync({ name: "Sporting", shortName: "SCP", picture: "/equipas/sporting.jpg" });
  teamMutation.mutateAsync({ name: "Porto", shortName: "FCP", picture: "/equipas/porto.png" });
  teamMutation.mutateAsync({ name: "Benfica", shortName: "SLB", picture: "/equipas/benfica.png" });

  gameMutation.mutateAsync({ date: new Date(2022, 11 - 1, 2, 22), location: "Estado dos Barreiros", tournamentId: 2, team1Id: 1, team2Id: 2, team1Result: 6, team2Result: 1 });
  gameMutation.mutateAsync({ date: new Date(2022, 12 - 1, 8, 19), location: "Ponte dos Frades", tournamentId: 2, team1Id: 2, team2Id: 3, team1Result: 2, team2Result: 2 });

  tournamentTeamMutation.mutateAsync({ tournamentId: 2, teamId: 1 });
  tournamentTeamMutation.mutateAsync({ tournamentId: 2, teamId: 2 });
  tournamentTeamMutation.mutateAsync({ tournamentId: 2, teamId: 3 });
  tournamentTeamMutation.mutateAsync({ tournamentId: 2, teamId: 4 });
}

function index(active: any) {

  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (active.active != null) setActivePage(active.active);
    else setActivePage(active);
  }, [active])

  // createDefaultValues();

  return (
    <div className="mx-[15%] text-center border-x p-[2rem]">
      {
            activePage === 0 ? <About /> : <Contacts/>
      }
    </div>
  )
}

export default index
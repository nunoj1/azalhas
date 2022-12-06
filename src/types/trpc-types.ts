export type Tournament = {
    id: number,
    tournamentName: string,
    startDate: Date,
    tournamentFinished?: boolean,
    teams?: TournamentTeam[],
    games?: Game[]
}

export type TournamentStatistics = {
    tournamentId: number,
    tournament: Tournament,
    stats: Statistics[]
}

export type Statistics = {
    teamId: number,
    team?: Team,
    teamWins: number,
    teamDraws: number,
    teamLoses: number,
    teamPoints: number,
    teamPlacement: number
}

export type Team = {
    id: number,
    name: string,
    shortName: string,
    picture?: string | null,
    tournaments?: TournamentTeam[],
    homeGames?: Game[],
    awayGames?: Game[]
}

export type TournamentTeam = {
    id: number,
    tournamentId: number,
    teamId: number,
    tournament?: Tournament,
    team?: Team
}

export type Game = {
    id:number, 
    date:Date | null,
    location?: string | null,
    tournamentId?: number | null,
    tournament?: Tournament
    team1Id: number,
    team2Id: number,
    team1?: Team,
    team2?: Team,
    team1Result?: number | null,
    team2Result?: number | null
};
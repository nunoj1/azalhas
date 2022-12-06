import { z } from "zod";
import { Statistics, Team, Tournament, TournamentStatistics } from "../../../types/trpc-types";

import { router, publicProcedure } from "../trpc";

export const tournamentsRouter = router({
    createTournament: publicProcedure
        .input(
            z.object({
                tournamentName: z.string(),
                tournamentFinished: z.boolean(),
                startDate: z.date()
            }))
        .mutation(async ({ input, ctx }) => {

            const tournamentName = input.tournamentName;
            const tournamentFinished = input.tournamentFinished;
            const startDate = input.startDate;

            const item: any = await ctx.prisma.tournaments.create({
                data: {
                    tournamentName,
                    tournamentFinished,
                    startDate
                },
            })
            return item;
        }),
    createTournamentTeam: publicProcedure
        .input(
            z.object({
                tournamentId: z.number(),
                teamId: z.number(),
            }))
        .mutation(async ({ input, ctx }) => {

            const tournamentId = input.tournamentId;
            const teamId: number = input.teamId;

            const item: any = await ctx.prisma.tournamentTeams.create({
                data: {
                    tournamentId,
                    teamId
                },
            })
            return item;
        }),
    getTournaments: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.tournaments.findMany({
            include: {
                games: true,
                teams: {
                    include: {
                        team: true
                    }
                }
            }
        });
    }),
    getTournamentsStats: publicProcedure.query(async ({ ctx }) => {
        let tournamentStatisticsList: TournamentStatistics[] = [];

        const data: Tournament[] = await ctx.prisma.tournaments.findMany({
            include: {
                games: true,
                teams: {
                    include: {
                        team: true
                    }
                }
            }
        });


        data.forEach((tournament: Tournament) => {
            let statisticList: Statistics[] = [];

            tournament.teams?.forEach((teamData) => {
                statisticList.push({
                    teamId: teamData.teamId,
                    team: teamData.team,
                    teamWins: 0,
                    teamDraws: 0,
                    teamLoses: 0,
                    teamPoints: 0,
                    teamPlacement: 0
                })
            })

            let newStatisticsList: Statistics[] = statisticList;

            console.log(tournament.startDate);
            console.log(new Date());
            console.log(tournament.startDate < new Date())

            if(tournament.startDate < new Date()){
                tournament.games?.forEach((game) => {


                    let t1Res = game.team1Result
                    let t2Res = game.team2Result
    
                    if (t1Res !== undefined && t2Res !== undefined && t1Res !== null && t2Res !== null) {
                        if (t1Res > t2Res) {
                            let t1 = newStatisticsList.find((item) => item.teamId === game.team1Id);
                            if (t1 != undefined && t1 != null) {
                                t1.teamWins += 1;
                                t1.teamPoints += 3;
                            }
    
                            let t2 = newStatisticsList.find((item) => item.teamId === game.team2Id);
                            if (t2 != undefined && t2 != null) {
                                t2.teamLoses += 1;
                            }
                        }
                        else if (t2Res > t1Res) {
                            let t1 = newStatisticsList.find((item) => item.teamId === game.team1Id);
                            if (t1 != undefined && t1 != null) {
                                t1.teamLoses += 1;
                            }
    
                            let t2 = newStatisticsList.find((item) => item.teamId === game.team2Id);
                            if (t2 != undefined && t2 != null) {
                                t2.teamWins += 1;
                                t2.teamPoints += 3;
                            }
                        }
                        else if (t1Res !== 0 && t2Res !== 0) {
                            let t1 = newStatisticsList.find((item) => item.teamId === game.team1Id);
                            if (t1 != undefined && t1 != null) {
                                t1.teamDraws += 1;
                                t1.teamPoints += 1;
                            }
    
                            let t2 = newStatisticsList.find((item) => item.teamId === game.team2Id);
                            if (t2 != undefined && t2 != null) {
                                t2.teamDraws += 1;
                                t2.teamPoints += 1;
                            }
                        }
                    }
                    newStatisticsList.sort((a, b) => {
                        if (a.teamPoints > b.teamPoints) {
                            return -1;
                        } else if (a.teamPoints < b.teamPoints) {
                            return 1;
                        } else {
                            if (a.teamLoses > b.teamLoses) {
                                return 1;
                            } else if (a.teamLoses < b.teamLoses) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                    })
                    let i = 1;
                    newStatisticsList.forEach((item) => { item.teamPlacement = i; i++ })
                })
            }

            tournamentStatisticsList.push({
                stats: newStatisticsList,
                tournamentId: tournament.id,
                tournament: tournament
            })
        })

        return tournamentStatisticsList;
    }),
});
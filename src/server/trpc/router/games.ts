import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const gamesRouter = router({
    createGame: publicProcedure
        .input(
            z.object({
                date: z.date(),
                location: z.string(),
                tournamentId: z.number(),
                team1Id: z.number(),
                team2Id: z.number(),
                team1Result: z.number(),
                team2Result: z.number()
            }))
        .mutation(async ({ input, ctx }) => {

            const date = input.date;
            const location = input.location;
            const tournamentId = input.tournamentId;
            const team1Id = input.team1Id;
            const team2Id = input.team2Id;
            const team1Result = input.team1Result;
            const team2Result = input.team2Result;

            const item = await ctx.prisma.games.create({
                data: {
                    date,
                    location,
                    tournamentId,
                    team1Id,
                    team2Id,
                    team1Result,
                    team2Result
                },
            })
            return item;
        }),
    getGames: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.games.findMany({
            include: {
                team1: true,
                team2: true,
                tournament: true
            }
        });
    }),
    getGameById: publicProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.games.findFirst({
                where: {
                    id: input.id
                },
                include: {
                    team1: true,
                    team2: true,
                    tournament: true
                }
            });
        })
});
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const teamsRouter = router({
    createTeam: publicProcedure
        .input(
            z.object({
                name: z.string(),
                shortName: z.string(),
                picture: z.string(),
            }))
        .mutation(async ({ input, ctx }) => {

            const name = input.name;
            const shortName = input.shortName;
            const picture = input.picture;

            const item = await ctx.prisma.teams.create({
                data: {
                    name,
                    shortName,
                    picture
                },
            })
            return item;
        }),
    getTeams: publicProcedure.query(async ({ ctx }) => {
       return await ctx.prisma.teams.findMany({
        include: {
            tournaments: true,
            homeGames: true,
            awayGames: true
        }
       });
     }),
});
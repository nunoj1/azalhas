import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const mainEventsRouter = router({
    createMainEvent: publicProcedure
        .input(
            z.object({
                title: z.string(),
                date: z.date(),
                categoryId: z.number(),
                gameId: z.number().optional()
            }))
        .mutation(async ({ input, ctx }) => {

            const title = input.title;
            const date = input.date;
            const categoryId = input.categoryId;
            const gameId = input.gameId;

            const item = await ctx.prisma.mainEvents.create({
                data: {
                    title,
                    date,
                    categoryId,
                    gameId
                },
            })
            return item;
        }),
    getTimeLineData: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.mainEvents.findMany({
            include: {
                category: true,
            },
            orderBy:{
                date: 'desc'
            }
        });
    }),
    getEventById: publicProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.mainEvents.findFirst({
                where: {
                    id: input.id
                },
                include: {
                    category: true,
                    realtedPosts: true
                }
            });
        })
});
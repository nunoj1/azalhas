import { Posts } from "@prisma/client";
import { z } from "zod";
import { Statistics, Team, Tournament, TournamentStatistics } from "../../../types/trpc-types";

import { router, publicProcedure } from "../trpc";

export const postsRouter = router({
    createPost: publicProcedure
        .input(
            z.object({
                title: z.string(),
                body: z.string(),
                date: z.date(),
                categoryId: z.number(),
                mainEventsId: z.number()
            }))
        .mutation(async ({ input, ctx }) => {

            const title = input.title;
            const body = input.body;
            const date = input.date;
            const categoryId = input.categoryId;
            const mainEventsId = input.mainEventsId;

            const item: any = await ctx.prisma.posts.create({
                data: {
                    title,
                    body,
                    date,
                    categoryId,
                    mainEventsId
                },
            })
            return item;
        }),
    getPostsForCategory: publicProcedure
        .input(
            z.object({
                id: z.number()
            }))
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.posts.findMany({
                where: {
                    categoryId: input.id
                },
                include: {
                    category: true
                },
                orderBy: {
                    date: 'desc'
                }
            });
        }),
    getEventPosts: publicProcedure
        .input(
            z.object({
                id: z.number()
            }))
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.posts.findMany({
                where: {
                    mainEventsId: input.id
                },
                include: {
                    category: true
                },
                orderBy: {
                    date: 'desc'
                }
            });
        }),
});
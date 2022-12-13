import { router } from "../trpc";
import { authRouter } from "./auth";
import { gamesRouter } from "./games";
import { mainEventsRouter } from "./mainEvents";
import { postsRouter } from "./posts";
import { teamsRouter } from "./teams";
import { tournamentsRouter } from "./tournaments";

export const appRouter = router({
  tournaments: tournamentsRouter,
  teams: teamsRouter,
  games: gamesRouter,
  auth: authRouter,
  mainEvents: mainEventsRouter,
  posts: postsRouter    
  // categories: categoriesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

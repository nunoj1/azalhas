import { router } from "../trpc";
import { authRouter } from "./auth";
import { gamesRouter } from "./games";
import { teamsRouter } from "./teams";
import { tournamentsRouter } from "./tournaments";

export const appRouter = router({
  tournaments: tournamentsRouter,
  teams: teamsRouter,
  games: gamesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

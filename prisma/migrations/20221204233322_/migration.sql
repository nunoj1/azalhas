/*
  Warnings:

  - You are about to drop the `_TeamsToTournaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TeamsToTournaments";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TournamentTeams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    CONSTRAINT "TournamentTeams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TournamentTeams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

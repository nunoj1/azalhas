-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TournamentTeams" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "TournamentTeams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TournamentTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TournamentTeams" ("id", "teamId", "tournamentId") SELECT "id", "teamId", "tournamentId" FROM "TournamentTeams";
DROP TABLE "TournamentTeams";
ALTER TABLE "new_TournamentTeams" RENAME TO "TournamentTeams";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

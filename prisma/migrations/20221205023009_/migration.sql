/*
  Warnings:

  - You are about to drop the `GameTeams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `team1Id` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team1Result` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team2Id` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team2Result` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GameTeams_gameId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GameTeams";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "team1Id" INTEGER NOT NULL,
    "team2Id" INTEGER NOT NULL,
    "team1Result" INTEGER NOT NULL,
    "team2Result" INTEGER NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    CONSTRAINT "Games_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("date", "id", "location", "tournamentId") SELECT "date", "id", "location", "tournamentId" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

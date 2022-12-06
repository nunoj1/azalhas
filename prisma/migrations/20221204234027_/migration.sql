/*
  Warnings:

  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Games` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `tournamentId` on the `Games` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Teams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Teams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `TournamentTeams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `TournamentTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `teamId` on the `TournamentTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `tournamentId` on the `TournamentTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Tournaments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Tournaments` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `GameTeams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `gameId` on the `GameTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `GameTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `team1Id` on the `GameTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `team2Id` on the `GameTeams` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    CONSTRAINT "Games_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("date", "id", "location", "tournamentId") SELECT "date", "id", "location", "tournamentId" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
CREATE TABLE "new_Teams" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "picture" TEXT
);
INSERT INTO "new_Teams" ("id", "name", "picture", "shortName") SELECT "id", "name", "picture", "shortName" FROM "Teams";
DROP TABLE "Teams";
ALTER TABLE "new_Teams" RENAME TO "Teams";
CREATE TABLE "new_TournamentTeams" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "TournamentTeams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TournamentTeams_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TournamentTeams" ("id", "teamId", "tournamentId") SELECT "id", "teamId", "tournamentId" FROM "TournamentTeams";
DROP TABLE "TournamentTeams";
ALTER TABLE "new_TournamentTeams" RENAME TO "TournamentTeams";
CREATE TABLE "new_Tournaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentName" TEXT NOT NULL,
    "tornamentFinished" BOOLEAN NOT NULL
);
INSERT INTO "new_Tournaments" ("id", "tornamentFinished", "tournamentName") SELECT "id", "tornamentFinished", "tournamentName" FROM "Tournaments";
DROP TABLE "Tournaments";
ALTER TABLE "new_Tournaments" RENAME TO "Tournaments";
CREATE TABLE "new_GameTeams" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "team1Id" INTEGER NOT NULL,
    "team2Id" INTEGER NOT NULL,
    "team1Result" INTEGER NOT NULL,
    "team2Result" INTEGER NOT NULL,
    CONSTRAINT "GameTeams_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTeams_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTeams_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameTeams" ("gameId", "id", "team1Id", "team1Result", "team2Id", "team2Result") SELECT "gameId", "id", "team1Id", "team1Result", "team2Id", "team2Result" FROM "GameTeams";
DROP TABLE "GameTeams";
ALTER TABLE "new_GameTeams" RENAME TO "GameTeams";
CREATE UNIQUE INDEX "GameTeams_gameId_key" ON "GameTeams"("gameId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

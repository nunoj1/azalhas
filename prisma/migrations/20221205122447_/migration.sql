/*
  Warnings:

  - Made the column `startDate` on table `Tournaments` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tournaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "tournamentFinished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Tournaments" ("id", "startDate", "tournamentFinished", "tournamentName") SELECT "id", "startDate", "tournamentFinished", "tournamentName" FROM "Tournaments";
DROP TABLE "Tournaments";
ALTER TABLE "new_Tournaments" RENAME TO "Tournaments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

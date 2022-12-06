/*
  Warnings:

  - You are about to drop the column `tornamentFinished` on the `Tournaments` table. All the data in the column will be lost.
  - Added the required column `tournamentFinished` to the `Tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tournaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentName" TEXT NOT NULL,
    "tournamentFinished" BOOLEAN NOT NULL
);
INSERT INTO "new_Tournaments" ("id", "tournamentName") SELECT "id", "tournamentName" FROM "Tournaments";
DROP TABLE "Tournaments";
ALTER TABLE "new_Tournaments" RENAME TO "Tournaments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

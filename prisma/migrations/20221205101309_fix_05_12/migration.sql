-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME,
    "location" TEXT,
    "team1Id" INTEGER NOT NULL,
    "team2Id" INTEGER NOT NULL,
    "team1Result" INTEGER,
    "team2Result" INTEGER,
    "tournamentId" INTEGER,
    CONSTRAINT "Games_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("date", "id", "location", "team1Id", "team1Result", "team2Id", "team2Result", "tournamentId") SELECT "date", "id", "location", "team1Id", "team1Result", "team2Id", "team2Result", "tournamentId" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
CREATE TABLE "new_Tournaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentName" TEXT NOT NULL,
    "tournamentFinished" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Tournaments" ("id", "tournamentFinished", "tournamentName") SELECT "id", "tournamentFinished", "tournamentName" FROM "Tournaments";
DROP TABLE "Tournaments";
ALTER TABLE "new_Tournaments" RENAME TO "Tournaments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

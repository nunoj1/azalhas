-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tournaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentName" TEXT NOT NULL,
    "tornamentFinished" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "picture" TEXT
);

-- CreateTable
CREATE TABLE "GameTeams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    "team1Result" INTEGER NOT NULL,
    "team2Result" INTEGER NOT NULL,
    CONSTRAINT "GameTeams_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTeams_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTeams_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    CONSTRAINT "Games_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TeamsToTournaments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TeamsToTournaments_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TeamsToTournaments_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "GameTeams_gameId_key" ON "GameTeams"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamsToTournaments_AB_unique" ON "_TeamsToTournaments"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamsToTournaments_B_index" ON "_TeamsToTournaments"("B");

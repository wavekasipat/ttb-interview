-- CreateTable
CREATE TABLE "system_log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL
);

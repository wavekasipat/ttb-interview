/*
  Warnings:

  - You are about to drop the `APIClient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "APIClient";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "api_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "secret" TEXT NOT NULL
);

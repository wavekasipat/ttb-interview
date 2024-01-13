/*
  Warnings:

  - Added the required column `url` to the `system_log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_system_log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_system_log" ("id", "level", "message", "timestamp") SELECT "id", "level", "message", "timestamp" FROM "system_log";
DROP TABLE "system_log";
ALTER TABLE "new_system_log" RENAME TO "system_log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

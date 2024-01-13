-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "citizen_id" TEXT NOT NULL,
    "facial_image" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_citizen_id_key" ON "customer"("citizen_id");

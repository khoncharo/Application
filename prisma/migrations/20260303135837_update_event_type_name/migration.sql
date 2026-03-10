/*
  Warnings:

  - The `type` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "events" DROP COLUMN "type",
ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'PUBLIC';

-- DropEnum
DROP TYPE "Type";

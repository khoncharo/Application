-- CreateEnum
CREATE TYPE "Type" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "SearchHistory" ADD COLUMN     "topics" TEXT[] DEFAULT ARRAY[]::TEXT[];

/*
  Warnings:

  - You are about to drop the `_ClassToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "class_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassToStudent";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

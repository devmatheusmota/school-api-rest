/*
  Warnings:

  - You are about to drop the column `class_id` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `course_id` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_class_id_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToTeacher" DROP CONSTRAINT "_ClassToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToTeacher" DROP CONSTRAINT "_ClassToTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "class_id",
ADD COLUMN     "course_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class_id",
ADD COLUMN     "course_id" TEXT;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "_ClassToTeacher";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToTeacher_AB_unique" ON "_CourseToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToTeacher_B_index" ON "_CourseToTeacher"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTeacher" ADD CONSTRAINT "_CourseToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTeacher" ADD CONSTRAINT "_CourseToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
CREATE SEQUENCE studentcard_number_seq;
ALTER TABLE "StudentCard" ALTER COLUMN "number" SET DEFAULT nextval('studentcard_number_seq');
ALTER SEQUENCE studentcard_number_seq OWNED BY "StudentCard"."number";

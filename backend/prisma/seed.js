import { PrismaClient, Prisma } from "../generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // lấy URL từ .env
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  
  // ==== 1. CLASSES ====
  await prisma.classes.createMany({
    data: [
      { name: "PTUDW", teacherName: "Ms. Tran Thi Bich Hanh" },
      { name: "CSDL", teacherName: "Ms. Tiet Gia Hong" },
    ],
  });

  // ==== 2. COURSES ====
  await prisma.courses.createMany({
    data: [
      { title: "Mathematics", description: "Basic math course" },
      { title: "Physics", description: "Intro to physics" },
      { title: "Chemistry", description: "Intro to chemistry" },
    ],
  });

  // ==== 3. STUDENTS ====
  await prisma.students.createMany({
    data: [
      { name: "Do Nguyen Minh Tri", classId: 1 },
      { name: "Do Van Ha", classId: 2 },
      { name: "Huynh Gia Au", classId: 1 },
      { name: "Nguyen Minh Luan", classId: 2 },
    ],
  });

  // ==== 4. STUDENT PROFILES ====
  await prisma.studentProfiles.createMany({
    data: [
      {
        studentId: 1,
        age: 20,
        gender: "Nam",
        address: "123 Nguyen Trai",
        phone: "0901123456",
        dateOfBirth: new Date("2004-05-12"),
      },
      {
        studentId: 2,
        age: 19,
        gender: "Nữ",
        address: "45 Le Loi",
        phone: "0909876543",
        dateOfBirth: new Date("2010-06-12"),
      },
      {
        studentId: 3,
        age: 21,
        gender: "Nam",
        address: "78 Vo Van Tan",
        phone: "0903332221",
        dateOfBirth: new Date("2013-01-01"),
      },
      {
        studentId: 4,
        age: 19,
        gender: "Nữ",
        address: "78 Nguyen Van Phu",
        phone: "0123456789",
        dateOfBirth: new Date("2013-01-01"),
      },
    ],
  });

  // ==== 5. STUDENT COURSE (many-to-many) ====
  await prisma.studentCourse.createMany({
    data: [
      // Student 1 học 3 môn
      { studentId: 1, courseId: 1 },
      { studentId: 1, courseId: 2 },
      { studentId: 1, courseId: 3 },

      // Student 2 học 2 môn
      { studentId: 2, courseId: 1 },
      { studentId: 2, courseId: 2 },

      // Student 3 học 3 môn
      { studentId: 3, courseId: 1 },
      { studentId: 3, courseId: 2 },
      { studentId: 3, courseId: 3 },

      // Student 4 học 2 môn
      { studentId: 4, courseId: 2 },
      { studentId: 4, courseId: 3 },
    ],
  });

  console.log("Mock data inserted successfully with createMany!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

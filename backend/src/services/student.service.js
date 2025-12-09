import { prisma } from "../config/prisma.js";

const getStudentById = async (student_id) => {
  const result = await prisma.students.findUnique({
    where: { id: Number(student_id) },
    //include: { class: true, studentProfile: true },
    select: {
      id: true,
      name: true,
      class: true,
      studentProfile: true,
    },
  });

  return result;
};

const createStudent = async (data) => {
  const { student_name, class_id } = data;
  const result = await prisma.students.create({
    data: {
      name: student_name,
      classId: class_id,
    },
  });

  return result;
};

export default { getStudentById, createStudent };

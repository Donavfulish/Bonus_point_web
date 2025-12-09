import { prisma } from "../config/prisma.js";

export const getStudentByClass = async (classId, sort, order, limit) => {
  try {
    let students = await prisma.classes.findUnique({
      where: { id: classId },
      include: {
        students: true,
      },
    });
    console.log(students);
    return students;
  } catch (err) {
    console.log(err);
  }
};

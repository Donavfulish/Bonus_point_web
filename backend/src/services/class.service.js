import { prisma } from "../config/prisma.js";
import { removeBigInt } from "../utils/helper.js";
export const getStudentByClass = async (classId, sort, order, limit) => {
  let classInfo = await prisma.classes.findUnique({
    where: { id: Number(classId) },
  });
  let orderByOptions;
  if (sort) {
    if (sort == "birthdate") {
      orderByOptions = { studentProfile: { dateOfBirth: order || "asc" } };
    }
  }

  const students = await prisma.students.findMany({
    where: { classId: Number(classId) },
    take: limit ? Number(limit) : undefined,
    ...(orderByOptions && { orderBy: orderByOptions }),
    include: {
      studentProfile: true,
    },
  });
  return removeBigInt({ ...classInfo, students });
};

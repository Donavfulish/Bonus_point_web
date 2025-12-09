import { prisma } from "../config/prisma.js";
import { removeBigInt } from "../utils/helper.js";
export const getStudentByClass = async (classId, sort, order, limit) => {
  let classInfo = await prisma.classes.findUnique({
    where: { id: Number(classId) },
  });
  let keySort = "";
  if (sort) {
    if (sort == "birthdate") {
      keySort = dateOfBirth;
    }
  }

  const orderByOptions = sort ? { [keySort]: order || "asc" } : undefined;
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

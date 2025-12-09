import { prisma } from "../config/prisma.js";

export const updateStudent = async (data) => {
  const [updatedStudent, updatedProfile] = await prisma.$transaction(
    async (ts) => {
      [
        await ts.students.update({
          where: { id: data.id },
          data: {
            name: data.name,
            classId: data.class_id,
          },
        }),

        await ts.studentProfiles.update({
          where: { studentId: data.id },
          data: {
            address: data.address,
            phone: data.phone,
            age: data.age,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
          },
        }),
      ];
    }
  );

  return { updatedStudent, updatedProfile };
};
export const deleteStudentCourse = async (studentId, courseId) => {
  const deletedStudentCourse = await prisma.studentCourse.delete({
    where: {
      studentId_courseId: {
        studentId: studentId,
        courseId: courseId,
      },
    },
  });
  return deletedStudentCourse;
};

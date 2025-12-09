import { prisma } from "../config/prisma.js";

export const updateStudent = async (data) => {
  const [updatedStudent, updatedProfile] = await prisma.$transaction(
    async (ts) => {
      [
        await ts.students.update({
          where: { id: data.id },
          data: {
            name: data.name,
            class_id: data.class_id,
          },
        }),

        await ts.student_profiles.update({
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
export const deleteStudentCourse = async (student_id, class_id) => {
  const deletedStudentCourse = await prisma.student_courses.delete({
    where: { student_id: student_id, class_id: class_id },
  });
  return deletedStudentCourse;
};
// C1
export const getMaxCourseStudent = async (name_like) => {
  try {
    const studentWithCourseCount = await prisma.studentCourse.groupBy({
      by: ["studentId"],
      _count: { courseId: true },
    });

    const maxCourse = Math.max(
      ...studentWithCourseCount.map((g) => g._count.courseId)
    );

    const result = await prisma.students.findMany({
      where: {
        name: { startsWith: name_like },
      },
      include: {
        studentCourse: true,
      },
    });

    const filteredResult = result.filter(
      (s) => s.studentCourse.length === maxCourse
    );

    return filteredResult;
  } catch (err) {
    console.log(err);
  }
};

//C2
export const getMaxCourseStudentV2 = async (name_like) => {
  try {
    const result = await prisma.$executeRawUnsafe(`
            SELECT
            FROM "STUDENT" s
            JOIN "STUDENT_COURSE" sub
              ON s.id = sub.studentId
            WHERE s.name ILIKE '${name_like}%'
            GROUP BY s.is
            HAVING count(sub.courseId) = (
                SELECT MAX(cnt) FROM (
                    SELECT COUNT(*) AS cnt
                    FROM "STUDENT_COURSE"
                    GROUP BY studentId
                ) AS COUNTS
            )
        `);
    return result;
  } catch (err) {
    console.log(err);
  }
};

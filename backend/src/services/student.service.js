import { prisma } from "../config/prisma.js";

export const updateStudent = async (data) => {
  console.log(data);
  const [updatedStudent, updatedProfile] = await prisma.$transaction(
    async (ts) => {
      const updatedStudent = await ts.students.update({
        where: { id: data.id },
        data: {
          name: data.name,
          classId: data.classId,
        },
      });

      const updatedProfile = await ts.studentProfiles.update({
        where: { studentId: data.id },
        data: {
          address: data.address,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
        },
      });

      return [updatedStudent, updatedProfile];
    }
  );

  return { updatedStudent, updatedProfile };
};
export const deleteStudentCourse = async (studentId, courseId) => {
  const deletedStudentCourse = await prisma.studentCourse.delete({
    where: {
      studentId_courseId: {
        studentId: Number(studentId),
        courseId: Number(courseId),
      },
    },
  });
  return deletedStudentCourse;
};

// C1
export const getMaxCourseStudent = async (name_like) => {
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
};

//C2
export const getMaxCourseStudentV2 = async (name_like) => {
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
};

export const getStudentById = async (student_id) => {
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

export const createStudent = async (data) => {
  const { name, classId } = data;
  const result = await prisma.students.create({
    data: {
      name: name,
      classId: classId,
    },
  });

  return result;
};

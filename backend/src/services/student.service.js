import { prisma } from "../config/prisma.js";

// C1
export const getMaxCourseStudent = async (name_like) => {
    try {
        const studentWithCourseCount = await prisma.studentCourse.groupBy({
            by: ['studentId'],
            _count: { courseId: true }
        });

        const maxCourse = Math.max(...studentWithCourseCount.map(g => g._count.courseId));

        const result = await prisma.students.findMany({
            where: {
                name: { startsWith: name_like },
            },
            include: {
                studentCourse: true
            }
        });

        const filteredResult = result.filter(s => s.studentCourse.length === maxCourse);

        return filteredResult;


    } catch (err) {
        console.log(err);
    }
}

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
        return result

    } catch (err) {
        console.log(err);
    }
}
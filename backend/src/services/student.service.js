import { prisma } from "../config/prisma.js";




export const updateStudent = async (data) => {

 const [updatedStudent, updatedProfile] =  await prisma.$transaction(async (ts) => {
        [
            await ts.students.update({
                where: { id: data.id},
                data: { 
                    name: data.name,
                    class_id: data.class_id
                },
        }   ),

            await ts.student_profiles.update({
                where: { studentId: data.id },
                data: { 
                    address: data.address,
                    phone: data.phone,
                    age: data.age,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth
                },
            })
        ]
    });
   
  return {updatedStudent, updatedProfile};
};
export const deleteStudentCourse = async (student_id, class_id) => {

    const deletedStudentCourse =  await prisma.student_courses.delete({
            where:{student_id: student_id, class_id: class_id}
    })
  return deletedStudentCourse;
};
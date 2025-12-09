import * as StudentService from "../services/student.service.js";

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await StudentService.updateStudent(req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteStudentCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const deletedStudentCourse = await StudentService.deleteStudentCourse(
      studentId,
      courseId
    );
    res.status(200).json(deletedStudentCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

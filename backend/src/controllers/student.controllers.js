import * as StudentService from "../services/student.service.js";

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await StudentService.createUser(req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteStudentCourse = async (req, res) => {
  try {
    const {class_id, student_id} = req.params;
    const deletedStudentCourse = await StudentService.deleteStudentCourse(class_id, student_id);
    res.status(200).json(deletedStudentCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

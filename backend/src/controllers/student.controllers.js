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

export const getMaxCourseStudentController = async (req, res) => {
    try {
        const { name_like = "" } = req.query;
        const result = await StudentService.getMaxCourseStudent(name_like);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err })
    }
}


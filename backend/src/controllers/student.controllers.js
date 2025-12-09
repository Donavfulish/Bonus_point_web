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


const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing student ID in request parameters." });
    }

    const student = await studentService.getStudentById(id);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: message });
  }
};


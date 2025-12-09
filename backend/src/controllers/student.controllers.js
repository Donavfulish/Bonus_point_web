import studentService from "../services/student.service.js";

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

export default { createStudent, getStudentById };

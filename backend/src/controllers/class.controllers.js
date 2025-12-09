import * as ClassService from "../services/class.service.js";

export const getStudentByClass = async (req, res) => {
  try {
    const { sort, order = "asc", limit } = req.query;
    const { id } = req.params;
    const students = await ClassService.getStudentByClass(
      id,
      sort,
      order,
      limit
    );

    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

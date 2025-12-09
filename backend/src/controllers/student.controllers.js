import { getMaxCourseStudent } from "../services/student.service.js";

export const getMaxCourseStudentController = async (req, res) => {
    try {
        const { name_like = "" } = req.query;
        const result = await getMaxCourseStudent(name_like);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err })
    }
}
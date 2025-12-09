import { Router } from "express";
import * as StudentController from "../controllers/student.controllers.js";

const router = Router();

router.put("/:id", StudentController.updateStudent);
router.delete(
  "/:studentId/course/:courseId",
  StudentController.deleteStudentCourse
);

export default router;

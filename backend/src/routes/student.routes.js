import { Router } from "express";
import * as studentControllers from "../controllers/student.controllers.js";

const router = Router();

router.put("/:id", studentControllers.updateStudent);
router.delete(
  "/:studentId/course/:courseId",
  studentControllers.deleteStudentCourse
);

router.get("/", studentControllers.getMaxCourseStudentController);
router.get("/:id", studentControllers.getStudentById);
router.post("/", studentControllers.createStudent);

export default router;

import { Router } from "express";
import { getMaxCourseStudentController } from "../controllers/student.controllers.js";
import * as studentControllers from "../controllers/student.controllers.js";

const router = Router();

router.get("/", getMaxCourseStudentController);

router.get("/:id", studentControllers.getStudentById);
router.post("/", studentControllers.createStudent);

export default router;

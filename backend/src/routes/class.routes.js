import { Router } from "express";
import { getMaxCourseStudentController } from "../controllers/student.controllers.js";
import * as classController from "../controllers/class.controllers.js"    
const router = Router();

router.get("/:id/student", classController.getStudentByClass)

export default router
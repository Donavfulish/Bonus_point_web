import { Router } from "express";
import { getMaxCourseStudentController } from "../controllers/student.controllers.js";
    
const router = Router();

router.get("/", getMaxCourseStudentController)

export default router
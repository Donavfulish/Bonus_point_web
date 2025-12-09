import { Router } from "express";
import studentControllers from "../controllers/student.controllers.js";

const router = Router();

router.get("/:id", studentControllers.getStudentById);
router.post("/", studentControllers.createStudent);

export default router;

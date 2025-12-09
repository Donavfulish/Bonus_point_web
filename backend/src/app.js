import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import {
  deleteStudentCourse,
  updateStudent,
} from "./controllers/student.controllers.js";
import studentRouter from "./routes/student.routes.js";

import classRouter from "./routes/class.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/class", classRouter);

app.use("/api/student/:id", updateStudent);
app.use("/api/student/:student_id/course/:course_id", deleteStudentCourse);

export default app;

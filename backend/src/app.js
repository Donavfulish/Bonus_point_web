import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import classRouter from "./routes/class.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/class", classRouter);

export default app;

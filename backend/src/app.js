import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/student", studentRouter);


export default app;

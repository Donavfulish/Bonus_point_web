import { Router } from "express";
import * as UserController from "../controllers/user.controllers.js";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);

export default router;

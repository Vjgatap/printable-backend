import express from "express";
import { updateUserController } from "../controller/userController.ts";
const router = express.Router();

router.patch("/", updateUserController);

export default router;

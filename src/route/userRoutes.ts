import express from "express";
import { updateUserController,getUserController } from "../controller/userController.ts";
const router = express.Router();

router.patch("/:id", updateUserController)
router.get("/:id",getUserController );



export default router;

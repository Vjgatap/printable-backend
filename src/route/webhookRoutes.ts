import express from "express";
import {createUser} from '../controller/webhookController.ts'
const router = express.Router();


router.post("/user", createUser);

export default router;

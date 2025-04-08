import express from "express";
import { sendSigningRequest } from "../controller/esignController.ts";
const router = express.Router();
//router to signRequest
router.post("signRequest", sendSigningRequest);
// router when user clicks on the sign link 

// router for submition of signature

export default router;

import { Router } from "express";
import { testInterview } from "../controllers/interview.controller.js";

const router = Router();

router.get("/", testInterview);

export default router; 
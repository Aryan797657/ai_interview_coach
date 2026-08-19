import { Router } from "express";
import { generateInterview } from "../controllers/interview.controller.js";
import { validateInterviewRequest } from "../middlewares/interview.middleware.js";

const router = Router();

router.post(
    "/generate",
    validateInterviewRequest,
    generateInterview
);

export default router;
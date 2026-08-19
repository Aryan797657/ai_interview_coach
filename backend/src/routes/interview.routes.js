import { Router } from "express";
import { generateInterview } from "../controllers/interview.controller.js";
import { validateInterviewRequest } from "../middlewares/interview.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateAnswerRequest } from "../middlewares/validateAnswerRequest.js";
import { submitAnswer } from "../controllers/interview.controller.js";

const router = Router();

router.post(
    "/generate",
    verifyJWT,
    validateInterviewRequest,
    generateInterview
);

router.post(
    "/:interviewId/answer",
    verifyJWT,
    validateAnswerRequest,
    submitAnswer
);

export default router;
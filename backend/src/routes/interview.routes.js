import { Router } from "express";
import { generateInterview } from "../controllers/interview.controller.js";
import { validateInterviewRequest } from "../middlewares/interview.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateAnswerRequest } from "../middlewares/validateAnswerRequest.js";
import { submitAnswer } from "../controllers/interview.controller.js";
import { startInterview } from "../controllers/interview.controller.js";
import { sendMessage } from "../controllers/interview.controller.js";
import { validateMessageRequest } from "../middleware/validateMessageRequest.js";
import { finishInterview } from "../controllers/interview.controller.js";

const router = Router();

router.post(
    "/start",
    verifyJWT,
    validateInterviewRequest,
    startInterview
);

router.post(
    "/:interviewId/message",
    verifyJWT,
    validateMessageRequest,
    sendMessage
);

router.post(
    "/:interviewId/finish",
    verifyJWT,
    finishInterview
);
export default router;
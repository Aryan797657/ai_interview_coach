import { Router } from "express";
import { generateInterview } from "../controllers/interview.controller.js";
import { validateInterviewRequest } from "../middlewares/interview.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/generate",
    verifyJWT,
    validateInterviewRequest,
    generateInterview
);

export default router;
import { generateInterviewQuestions } from "../services/interview.service.js";
import Interview from "../models/interview.model.js";

export const generateInterview = async (req, res) => {
    try {
        const { topic, difficulty, numberOfQuestions } = req.body;

        const questions = await generateInterviewQuestions(
            topic,
            difficulty,
            numberOfQuestions
        );

        const interview = await Interview.create({
            user: req.user._id,
            topic,
            difficulty,
            numberOfQuestions,
            questions
        });

        return res.status(201).json({
            success: true,
            message: "Interview generated successfully",
            interview
        });

    } catch (error) {
        console.error("Interview generation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate interview questions"
        });
    }
};
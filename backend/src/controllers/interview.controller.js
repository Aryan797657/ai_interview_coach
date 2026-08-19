import { generateInterviewQuestions } from "../services/interview.service.js";

export const generateInterview = async (req, res) => {
    try {
        const { topic, difficulty, numberOfQuestions } = req.body;

        const questions = await generateInterviewQuestions(
            topic,
            difficulty,
            numberOfQuestions
        );

        return res.status(200).json({
            success: true,
            questions
        });

    } catch (error) {
        console.error("Interview generation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate interview questions"
        });
    }
};
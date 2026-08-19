import {
    generateInterviewQuestions,
    evaluateInterviewAnswer
} from "../services/interview.service.js";
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

export const submitAnswer = async (req, res) => {
    try {
        const { questionId, answer } = req.body;
        const { interviewId } = req.params;

        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        if (interview.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this interview"
            });
        }

        const question = interview.questions.id(questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        question.answer = answer;

        const evaluation = await evaluateInterviewAnswer(
            question.question,
            answer
        );

        question.feedback = evaluation.feedback;

        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Answer submitted successfully",
            question
        });

    } catch (error) {
        console.error("Submit answer error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit answer"
        });
    }
};
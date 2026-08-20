import {
    generateInterviewQuestions,
    evaluateInterviewAnswer,
    generateNextInterviewQuestion
} from "../services/interview.service.js";
import Interview from "../models/interview.model.js";

export const startInterview = async (req, res) => {
    try {
        const { topic, difficulty, numberOfQuestions } = req.body;

        const firstQuestion = await generateNextInterviewQuestion(
            topic,
            difficulty,
            []
        );

        const interview = await Interview.create({
            user: req.user._id,
            topic,
            difficulty,
            numberOfQuestions,
            messages: [
                {
                    role: "interviewer",
                    content: firstQuestion
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Interview started successfully",
            interview
        });

    } catch (error) {
        console.error("Start interview error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to start interview"
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
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

        interview.messages.push({
            role: "candidate",
            content: message
        });

        const interviewerResponse =
            await generateInterviewerResponse(
                interview.topic,
                interview.difficulty,
                interview.messages
            );

        interview.messages.push({
            role: "interviewer",
            content: interviewerResponse
        });

        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Message processed successfully",
            interviewerResponse,
            interview
        });

    } catch (error) {
        console.error("Send message error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to process message"
        });
    }
};

export const finishInterview = async (req, res) => {
    try {
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

        const feedback = await generateFinalFeedback(
            interview.topic,
            interview.difficulty,
            interview.messages
        );

        interview.finalFeedback = feedback.finalFeedback;

        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Interview completed successfully",
            finalFeedback: interview.finalFeedback
        });

    } catch (error) {
        console.error("Finish interview error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to finish interview"
        });
    }
};
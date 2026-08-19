import "dotenv/config";
import { GoogleGenAI } from "@google/genai";



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const generateInterviewQuestions = async (
    topic,
    difficulty,
    numberOfQuestions
) => {
    const prompt = `
    You are an experienced technical interviewer conducting a realistic interview.

    Generate ${numberOfQuestions} technical interview questions about ${topic}
    at ${difficulty} difficulty level.

    The questions should:
    - Test actual understanding, not just memorization.
    - Be relevant to real technical interviews.
    - Progress naturally in difficulty where appropriate.
    - Include mostly practical and conceptual questions.
    - Be clear and specific.
    - Do not provide answers or explanations.
    - Do not be overly generous with easy questions; only one or two questions
    may be relatively straightforward.

    The goal is to help the candidate genuinely prepare for an interview session.

    Return ONLY valid JSON in exactly this structure:

    {
        "questions": [
            {
                "question": "Question 1"
            },
            {
                "question": "Question 2"
            }
        ]
    }

    Do not include markdown, code fences, explanations, or any text outside the JSON.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    questions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question: {
                                    type: "string"
                                }
                            },
                            required: ["question"]
                        }
                    }
                },
                required: ["questions"]
            }
        }
    });

    return JSON.parse(response.text); 
};
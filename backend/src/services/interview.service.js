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
    You are an experienced technical interviewer conducting a professional
    software engineering interview.

    Generate exactly ${numberOfQuestions} interview questions about "${topic}".

    Difficulty level: ${difficulty}

    Follow these requirements carefully:

    1. Every question must be directly relevant to "${topic}".
    2. Questions should test genuine understanding rather than simple memorization.
    3. Match the requested difficulty level accurately.
    4. Avoid repetitive questions that test the same concept.
    5. Use a good mix of conceptual, practical, scenario-based, and problem-solving
    questions when appropriate for the topic.
    6. Questions should resemble questions asked in real technical interviews.
    7. Questions must be clear, specific, and unambiguous.
    8. Do not ask questions unrelated to "${topic}".
    9. Do not provide answers, hints, explanations, or solutions.
    10. Generate exactly ${numberOfQuestions} questions.
    11. Do not make the interview overly easy. Include only one or two relatively
    approachable questions; the remaining questions should appropriately
    challenge the candidate at the requested difficulty level.
    12. The question set should help the candidate meaningfully prepare for a
    real interview by testing skills and concepts that are commonly relevant
    to the selected topic. 

    Return only the questions.
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
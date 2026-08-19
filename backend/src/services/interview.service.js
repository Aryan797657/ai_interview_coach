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

export const evaluateInterviewAnswer = async (
    question,
    answer
) => {
    const prompt = `
You are an experienced technical interviewer evaluating a candidate's answer.

Interview Question:
${question}

Candidate's Answer:
${answer}

Evaluate the answer based on:
- Technical correctness
- Understanding of the concept
- Completeness
- Clarity
- Relevance to the question

Be fair and realistic. Do not be unnecessarily harsh, but do not praise an answer
that is technically incorrect or incomplete.

Provide useful feedback that helps the candidate perform better in a real interview.

Return ONLY valid JSON in exactly this structure:

{
    "feedback": {
        "whatWasGood": "What the candidate explained correctly.",
        "whatWasMissing": "Important concepts or details that were missing.",
        "howToImprove": "Specific ways the candidate can improve the answer.",
        "overallAssessment": "A concise overall assessment of the answer."
    }
}

Do not include markdown, code fences, or any text outside the JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    const parsedResponse = JSON.parse(response.text);

    return parsedResponse;
};
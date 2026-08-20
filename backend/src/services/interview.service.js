import "dotenv/config";
import { GoogleGenAI } from "@google/genai";



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


export const generateNextInterviewQuestion = async (
    topic,
    difficulty,
    messages
) => {
    const conversation = messages
        .map(
            (message) =>
                `${message.role}: ${message.content}`
        )
        .join("\n");

    const prompt = `
You are an experienced technical interviewer.

Conduct a realistic technical interview.

Topic: ${topic}
Difficulty: ${difficulty}

Conversation so far:
${conversation || "No conversation yet."}

Ask the next interview question.

Rules:
- Ask only ONE question.
- The question must be relevant to the topic.
- Prefer questions that test understanding and practical knowledge.
- Do not reveal the answer.
- Do not give feedback yet.
- If the candidate's previous answer needs clarification, ask a relevant follow-up.
- Otherwise, move naturally to the next interview concept.
- Do not be overly generous; only one or two questions in the entire interview
  should be relatively straightforward.
- Keep the interview useful for real interview preparation.

Return ONLY the question as plain text.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text.trim();
};

export const generateInterviewerResponse = async (
    topic,
    difficulty,
    messages
) => {
    const conversation = messages
        .map(
            (message) =>
                `${message.role}: ${message.content}`
        )
        .join("\n");

    const prompt = `
You are conducting a realistic technical interview.

Topic: ${topic}
Difficulty: ${difficulty}

Conversation:
${conversation}

Respond as the interviewer.

Rules:
- Ask only ONE question at a time.
- If the candidate's answer is incomplete or unclear, ask a useful follow-up.
- Otherwise move to the next relevant technical concept.
- Do not give detailed feedback during the interview.
- Do not reveal the answer to the question.
- If the candidate asks for clarification, briefly clarify the concept without giving away the answer.
- If the candidate asks you to directly provide the answer, encourage them to attempt it instead.
- Keep the interview realistic and technically challenging.
- Do not be overly generous. Only one or two questions should be relatively straightforward.
- Help the candidate improve through meaningful questioning.

Return ONLY the next interviewer message.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text.trim();
};

export const generateFinalFeedback = async (
    topic,
    difficulty,
    messages
) => {
    const conversation = messages
        .map(
            (message) =>
                `${message.role}: ${message.content}`
        )
        .join("\n");

    const prompt = `
You are an experienced technical interviewer reviewing a completed interview.

Topic: ${topic}
Difficulty: ${difficulty}

Complete interview conversation:

${conversation}

Analyze the candidate's performance across the entire interview.

Focus on:
- Technical understanding
- Accuracy
- Completeness
- Clarity
- Ability to explain concepts
- Areas where the candidate struggled
- Areas where the candidate demonstrated strong understanding

Be realistic and constructive.
Do not be overly generous.
Do not invent strengths that were not demonstrated.

The purpose is to help the candidate perform better in future interviews.

Return ONLY valid JSON in exactly this structure:

{
    "finalFeedback": {
        "whatWasGood": "...",
        "whatWasMissing": "...",
        "howToImprove": "...",
        "overallAssessment": "..."
    }
}

Do not include markdown, code fences, or text outside the JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return JSON.parse(response.text);
};
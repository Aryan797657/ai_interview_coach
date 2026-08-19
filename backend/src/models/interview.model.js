import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        topic: {
            type: String,
            required: true,
            trim: true
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard"]
        },

        numberOfQuestions: {
            type: Number,
            required: true,
            min: 1,
            max: 15
        },

        questions: [
            {
                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    default: null
                },

                feedback: {
                    whatWasGood: {
                        type: String,
                        default: null
                    },

                    whatWasMissing: {
                        type: String,
                        default: null
                    },

                    howToImprove: {
                        type: String,
                        default: null
                    },

                    overallAssessment: {
                        type: String,
                        default: null
                    }
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
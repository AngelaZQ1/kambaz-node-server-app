import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        _id: String,
        quiz: { type: String, ref: "QuizModel", required: true },
        title: { type: String, default: "New Question" },
        points: { type: Number, default: 1 },
        question: { type: String, default: "Question text" },
        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
            default: "MULTIPLE_CHOICE",
        },
        choices: {
            type: [
                {
                    text: { type: String, default: "Choice 1" },
                    isCorrect: { type: Boolean, default: true },
                },
            ],
            default: () => [{ text: "Choice 1", isCorrect: true }],
        },
    },
    { collection: "questions" }
);

export default questionSchema;
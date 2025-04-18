import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        _id: String,
        quiz: { type: String, ref: "QuizModel", required: true },
        title: { type: String, required: false },
        points: { type: Number, default: 1 },
        question: { type: String, required: true },
        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
            required: true,
        },
        choices: [
            {
                text: String,
                isCorrect: Boolean, // only one choice can be correct
            },
        ],
    },
    { collection: "questions" }
);

export default questionSchema;
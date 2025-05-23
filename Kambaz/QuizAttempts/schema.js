import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
    {
        _id: String,
        student: { type: String, ref: "UserModel", required: true },
        quiz: { type: String, ref: "QuizModel", required: true },
        score: { type: Number, default: 0 },
        answers: [
            {
                question: { type: String, ref: "QuestionModel", required: true },
                selectedChoiceId: String,
                fillInTheBlankAnswer: String,
                isCorrect: Boolean,
            },
        ],
    },
    { collection: "quiz_attempts", timestamps: true }
);

export default quizAttemptSchema;

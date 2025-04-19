import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: { type: String, ref: "CourseModel" },
        questions: { type: [{ type: String, ref: "QuestionModel" }], default: [] },
        type: {
            type: String,
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
            default: "Graded Quiz",
        },
        points: {
            type: Number,
            default: function () {
                return this.questions.reduce((sum, question) => sum + (question.points || 0), 0);
            },
        },
        assignmentGroup: {
            type: String,
            enum: ["Quizzes", "Exams", "Assignments", "Project"],
            default: "Quizzes",
        },
        shuffleAnswers: { type: Boolean, default: true },
        timeLimit: { type: Number, default: 20 },
        allowMultipleAttempts: { type: Boolean, default: false },
        numAllowedAttempts: { type: Number, default: 1 },
        showCorrectAnswers: { type: String, default: "" }, // TODO what are the possible values?
        accessCode: { type: String, default: "" },
        oneQuestionAtATime: { type: Boolean, default: true },
        webcamRequired: { type: Boolean, default: false },
        lockQuestionsAfterAnswering: { type: Boolean, default: false },
        dueDate: Date,
        availableDate: Date,
        untilDate: Date,
        published: Boolean,
    },
    { collection: "quizzes" }
);

export default quizSchema;
import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../Questions/model.js";
import model from "./model.js";

export const findQuizzesForCourse = (courseId) => model.find({ course: courseId }).populate("questions").exec();
export const findQuizById = (quizId) => model.findById(quizId);
export const createQuiz = async (courseId) => {
    const quiz = await model.create({
        _id: uuidv4(),
        title: "New Quiz",
        course: courseId,
    });
    return model.findById(quiz._id);
}
export const updateQuiz = async (quizId, quizUpdates) => {
    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
    const quiz = await model.findById(quizId).populate("questions"); // Populate questions to access their points
    const totalPoints = quiz.questions.reduce((sum, question) => sum + (question.points || 0), 0);
    await model.updateOne({ _id: quizId }, { $set: { points: totalPoints } });
    return model.findById(quizId).populate("questions");
};
export const addQuestionToQuiz = async (quizId, questionData) => {
    const question = { ...questionData, _id: uuidv4(), quiz: quizId };
    const newQuestion = await QuestionModel.create(question);
    await model.updateOne(
        { _id: quizId },
        {
            $push: { questions: newQuestion._id },
            $inc: { points: newQuestion.points || 0 },
        }
    );
    return newQuestion;
};
export const deleteQuestionFromQuiz = async (quizId, questionId) => {
    await QuestionModel.deleteOne({ _id: questionId });
    await model.updateOne(
        { _id: quizId },
        {
            $pull: { questions: questionId },
            $inc: { points: -(question.points || 0) },
        }
    );
}
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
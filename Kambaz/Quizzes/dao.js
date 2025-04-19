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

    // update points
    const totalPoints = quiz.questions.reduce((sum, question) => sum + (question.points || 0), 0);

    // calculate availability
    let availability = "Closed";
    const currentDate = new Date();
    if (quiz.availableDate && quiz.availableUntilDate) {
        if (currentDate < quiz.availableDate) {
            availability = `Not available until ${quiz.availableDate.toISOString()}`;
        } else if (currentDate >= quiz.availableDate && currentDate <= quiz.availableUntilDate) {
            availability = "Available";
        }
    }
    await model.updateOne({ _id: quizId }, { $set: { availability, points: totalPoints } });
    return model.findById(quizId).populate("questions");
};
export const addQuestionToQuiz = async (quizId, questionData) => {
    const question = { ...questionData, _id: uuidv4(), quiz: quizId };
    const newQuestion = await QuestionModel.create(question);
    await model.updateOne(
        { _id: quizId },
        {
            $push: { questions: newQuestion._id }
        }
    );
    return newQuestion;
};
export const deleteQuestionFromQuiz = async (quizId, question) => {
    await QuestionModel.deleteOne({ _id: question });
    await model.updateOne(
        { _id: quizId },
        {
            $pull: { questions: question._id },
            $dec: { points: (question.points || 0) },
        }
    );
}
export const deleteQuiz = async (quizId) => {
    await QuestionModel.deleteMany({ quiz: quizId });
    await model.deleteOne({ _id: quizId })
};
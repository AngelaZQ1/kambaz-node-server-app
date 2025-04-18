
import model from "./model.js";

export const findQuizzesForCourse = (courseId) => model.find({ course: courseId }).populate("questions").exec();
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
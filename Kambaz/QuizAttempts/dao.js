import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export const numQuizAttemptsForUser = async (userId, quizId) => {
    const attempts = await model.find({ student: userId, quiz: quizId });
    return attempts.length;
};

export const getLatestQuizAttemptForUser = async (userId, quizId) => {
    return model
        .findOne({ student: userId, quiz: quizId })
        .sort({ createdAt: -1 })
};

export const createQuizAttempt = async (userId, quizId, score, answers) => {
    const quizAttempt = await model.create({
        _id: uuidv4(),
        student: userId,
        quiz: quizId,
        score,
        answers,
    });
    return quizAttempt;
}
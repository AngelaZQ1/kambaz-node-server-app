import * as dao from "./dao.js";


export default function QuizAttemptRoutes(app) {
    const getQuizAttemptsForUser = async (req, res) => {
        const { userId, quizId } = req.params;
        const quizAttempts = await dao.findQuizAttemptsForUser(userId, quizId);
        res.json(quizAttempts);
    };
    const getLatestQuizAttemptForUser = async (req, res) => {
        const { userId, quizId } = req.params;
        const latestAttempt = await dao.getLatestQuizAttemptForUser(userId, quizId);
        res.json(latestAttempt);
    }
    const createQuizAttempt = async (req, res) => {
        const { userId, quizId } = req.params;
        const { score, answers } = req.body;
        const newQuizAttempt = await dao.createQuizAttempt(userId, quizId, score, answers);
        res.json(newQuizAttempt);
    }

    app.get("/api/quiz-attempts/:userId/:quizId", getQuizAttemptsForUser)
    app.get("/api/quiz-attempts/latest/:userId/:quizId", getLatestQuizAttemptForUser)
    app.post("/api/quiz-attempts/:quizId/:userId", createQuizAttempt)
}
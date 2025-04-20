import * as quizAttemptDao from "../QuizAttempts/dao.js";
import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    const getQuizzes = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    }
    const createQuiz = async (req, res) => {
        const { courseId } = req.params;
        const newQuiz = await dao.createQuiz(courseId);
        res.json(newQuiz);
    }
    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const quizUpdates = req.body;
        await dao.updateQuiz(qid, quizUpdates);
        const updatedQuiz = await dao.findQuizById(qid);
        res.json(updatedQuiz);
    }
    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    }
    const addQuestionToQuiz = async (req, res) => {
        const { qid } = req.params;
        const questionData = req.body;
        const newQuestion = await dao.addQuestionToQuiz(qid, questionData);
        res.json(newQuestion);
    }
    const deleteQuestionFromQuiz = async (req, res) => {
        const { qid, questionId } = req.params;
        await dao.deleteQuestionFromQuiz(qid, questionId);
        const updatedQuiz = await dao.findQuizById(qid);
        res.json(updatedQuiz);
    }
    const canUserAttemptQuiz = async (req, res) => {
        const { quizId, userId } = req.params;

        const numAttempts = await quizAttemptDao.numQuizAttemptsForUser(userId, quizId);
        const quiz = await dao.findQuizById(quizId);

        const attemptsAllowed = quiz.numAllowedAttempts || 1;
        if (numAttempts >= attemptsAllowed) {
            return res.json({ canAttempt: false });
        }
        res.json({ canAttempt: true });
    };

    app.delete("/api/quizzes/:qid/questions/:questionId", deleteQuestionFromQuiz);
    app.post("/api/quizzes/:courseId", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.get("/api/quizzes/:courseId", getQuizzes);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.post("/api/quizzes/:qid/questions", addQuestionToQuiz);
    app.get("/api/quizzes/:quizId/can-attempt/:userId", canUserAttemptQuiz);
}
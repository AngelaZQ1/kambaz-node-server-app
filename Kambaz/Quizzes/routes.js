
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
        await dao.addQuestionToQuiz(qid, questionData);
        const updatedQuiz = await dao.findQuizById(qid);
        res.json(updatedQuiz);
    }
    const deleteQuestionFromQuiz = async (req, res) => {
        const { qid, questionId } = req.params;
        await dao.deleteQuestionFromQuiz(qid, questionId);
        const updatedQuiz = await dao.findQuizById(qid);
        res.json(updatedQuiz);
    }
    app.delete("/api/quizzes/:qid/questions/:questionId", deleteQuestionFromQuiz);
    app.post("/api/quizzes/:courseId", createQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);
    app.get("/api/quizzes/:courseId", getQuizzes);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.post("/api/quizzes/:qid/questions", addQuestionToQuiz);
}
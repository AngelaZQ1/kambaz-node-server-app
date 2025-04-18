
import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    const getQuizzes = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
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
    app.put("/api/quizzes/:qid", updateQuiz);
    app.get("/api/quizzes/:courseId", getQuizzes);
    app.delete("/api/quizzes/:qid", deleteQuiz);
}
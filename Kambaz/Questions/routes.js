import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        await dao.updateQuestion(questionId, questionUpdates);
        const updatedQuestion = await dao.findQuestionById(questionId);
        res.json(updatedQuestion);
    }
    app.put("/api/questions/:questionId", updateQuestion);
}
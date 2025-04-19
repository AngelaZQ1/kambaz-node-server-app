import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    const updateQuestion = async (req, res) => {
        const { qid } = req.params;
        const questionUpdates = req.body;
        await dao.updateQuestion(qid, questionUpdates);
        const updatedQuestion = await dao.findQuestionById(qid);
        res.json(updatedQuestion);
    }
    app.put("/api/questions/:qid", updateQuestion);
}
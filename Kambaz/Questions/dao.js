import model from "./model.js";

export const updateQuestion = (qid, questionUpdates) => model.updateOne({ _id: qid }, { $set: questionUpdates });
export const findQuestionById = (qid) => model.findById(qid);

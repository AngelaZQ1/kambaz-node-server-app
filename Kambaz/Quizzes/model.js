import mongoose from "mongoose";
import "../Questions/model.js"; // or correct path to your QuestionModel file
import schema from "./schema.js";

const model = mongoose.model("QuizModel", schema);
export default model;
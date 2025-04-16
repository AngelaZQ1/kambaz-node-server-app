import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function getAssignmentsForCourse(courseId) {
    const assignments = await model.find({ course: courseId });
    return assignments;
}
export function createAssignment(assignment) {
    return model.create({ ...assignment, _id: uuidv4() });
}
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}
import * as dao from "./dao.js";


export default function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = dao.getAllAssignments();
        res.send(assignments);
    });
    app.post("/api/assignments/:courseId/assignment", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = dao.createAssignment(assignment);
        res.send(newAssignment);
    });
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.send(status);
    });
}
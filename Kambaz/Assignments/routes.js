import * as dao from "./dao.js";


export default function AssignmentRoutes(app) {
    app.get("/api/assignments/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.getAssignmentsForCourse(courseId);
        res.send(assignments);
    });
    app.post("/api/assignments/:courseId/assignment", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await dao.createAssignment(assignment);
        res.send(newAssignment);
    });
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.send(status);
    });
}
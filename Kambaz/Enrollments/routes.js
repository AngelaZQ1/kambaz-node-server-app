import * as dao from "./dao.js";


export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.getEnrollments();
        res.send(enrollments);
    });
    app.post("/api/enrollments/userId/:userId/courseId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.enrollUserInCourse(userId, courseId);
        res.send(status);
    });
    app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    });
}
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import session from "express-session";
import mongoose from 'mongoose';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import QuestionRoutes from './Kambaz/Questions/routes.js';
import QuizAttemptRoutes from './Kambaz/QuizAttempts/routes.js';
import QuizzesRoutes from './Kambaz/Quizzes/routes.js';
import UserRoutes from './Kambaz/Users/routes.js';
import Lab5 from './Lab5/index.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
}))

app.use(express.json())

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

Lab5(app)
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizzesRoutes(app);
QuestionRoutes(app);
QuizAttemptRoutes(app);

app.use((err, req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.NETLIFY_URL || "http://localhost:5173");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 4000)

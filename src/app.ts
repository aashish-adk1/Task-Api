import express from "express";
import taskRoutes from "./routes/tasks.route.js"
const app = express();

app.use(express.json());

app.use("/api/v1/tasks",taskRoutes);

export default app;


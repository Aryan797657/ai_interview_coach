import express from "express";
import cors from "cors";
import interviewRouter from "./routes/interview.routes.js";
import "dotenv/config";
// import { PORT } from "./config/env.js";

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

app.use("/api/v1/interview", interviewRouter);

app.get("/", (req, res) => {
    res.json({
        message: "AI Interview Coach API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
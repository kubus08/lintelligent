import "dotenv/config"
import express from "express";
import { webhookRouter } from "./routes/webhook.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const payload = req.body;
    res.send("GitHub App webhook listener is running!" + payload);
});

app.use("/api/github", webhookRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
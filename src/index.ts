import "dotenv/config"
import express from "express"
import { webhookRouter } from "./routes/webhook";

const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Hello from simple API 🚀! V1" });
});

app.use("/api/github", webhookRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

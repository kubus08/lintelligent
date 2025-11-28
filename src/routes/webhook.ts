import { Router } from "express";
import { prisma } from "../prisma";
import { InstallationAction, installationHandlers } from "../webhooks/installation";

export const webhookRouter = Router();

webhookRouter.post("/webhook", async (req, res) => {
    const signature = req.headers["x-hub-signature-256"] as string;
    const event = req.headers["x-github-event"];
    const payload = req.body;

    const action = payload.action as InstallationAction;

    const handler = installationHandlers[action];
    if (!handler) {
        return res.status(400).json({ ok: false, message: "Unsupported action" });
    }

    try {
        await handler(payload);
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ ok: false });
    }
});
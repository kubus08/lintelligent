import { prisma } from "../prisma/index.js";

export type InstallationAction = "created" | "deleted";

async function handleInstallationCreated(payload: any) {
    const installationId = payload.installation.id;
    const repos = payload.repositories ?? [];

    const operations = repos.map((repo: any) =>
        prisma.repository.upsert({
            where: { repoId: repo.id },
            update: {},
            create: {
                repoId: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                installationId,
            },
        })
    );

    await Promise.all(operations);
}

async function handleInstallationDeleted(payload: any) {
    const installationId = payload.installation.id;

    await prisma.repository.deleteMany({
        where: { installationId },
    });
}

export const installationHandlers: Record<InstallationAction, (p: any) => Promise<void>> = {
    created: handleInstallationCreated,
    deleted: handleInstallationDeleted,
};
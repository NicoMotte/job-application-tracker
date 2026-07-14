import express, { type Request, type Response } from "express";
import {
  changeApplicationStatus,
  clearApplications,
  createApplication,
  getApplications,
} from "../services/applicationService";
import type { ApplicationStatus } from "../domain/applicationWorkflow";

export const app = express();

app.use(express.json());

function isApplicationStatus(value: unknown): value is ApplicationStatus {
  return (
    value === "draft" ||
    value === "sent" ||
    value === "interview" ||
    value === "rejected" ||
    value === "accepted"
  );
}

app.post("/applications", (req: Request, res: Response) => {
  const { id, company } = req.body;

  if (typeof id !== "string" || typeof company !== "string") {
    return res.status(400).json({
      error: "id and company are required",
    });
  }

  const application = createApplication(id, company);

  return res.status(201).json(application);
});

app.get("/applications", (_req: Request, res: Response) => {
  return res.status(200).json(getApplications());
});

app.patch("/applications/:id/status", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isApplicationStatus(status)) {
    return res.status(400).json({
      error: "Invalid application status",
    });
  }

  try {
    const application = changeApplicationStatus(id, status);
    return res.status(200).json(application);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error: "Unexpected error",
    });
  }
});

export function resetApiState(): void {
  clearApplications();
}

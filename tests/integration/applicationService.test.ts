import { beforeEach, describe, expect, it } from "vitest";
import {
  changeApplicationStatus,
  clearApplications,
  createApplication,
} from "../../src/services/applicationService";

describe("applicationService", () => {
  beforeEach(() => {
    clearApplications();
  });

  it("crée une candidature avec le statut draft", () => {
    const application = createApplication("app-1", "Deezer");

    expect(application).toEqual({
      id: "app-1",
      company: "Deezer",
      status: "draft",
    });
  });

  it("change le statut d'une candidature existante", () => {
    createApplication("app-1", "Deezer");

    const updatedApplication = changeApplicationStatus("app-1", "sent");

    expect(updatedApplication.status).toBe("sent");
  });

  it("refuse une transition interdite", () => {
    createApplication("app-1", "Deezer");

    expect(() => changeApplicationStatus("app-1", "interview")).toThrow(
      "Cannot move application from draft to interview",
    );
  });

  it("refuse de modifier une candidature inexistante", () => {
    expect(() => changeApplicationStatus("unknown-id", "sent")).toThrow(
      "Application unknown-id not found",
    );
  });
});

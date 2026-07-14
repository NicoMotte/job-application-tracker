import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app, resetApiState } from "../../src/api/app";

describe("applications API", () => {
  beforeEach(() => {
    resetApiState();
  });

  it("crée une candidature", async () => {
    const response = await request(app).post("/applications").send({
      id: "app-1",
      company: "Deezer",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: "app-1",
      company: "Deezer",
      status: "draft",
    });
  });

  it("liste les candidatures", async () => {
    await request(app).post("/applications").send({
      id: "app-1",
      company: "Deezer",
    });

    const response = await request(app).get("/applications");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "app-1",
        company: "Deezer",
        status: "draft",
      },
    ]);
  });

  it("change le statut d'une candidature", async () => {
    await request(app).post("/applications").send({
      id: "app-1",
      company: "Deezer",
    });

    const response = await request(app)
      .patch("/applications/app-1/status")
      .send({
        status: "sent",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("sent");
  });

  it("refuse un statut invalide", async () => {
    await request(app).post("/applications").send({
      id: "app-1",
      company: "Deezer",
    });

    const response = await request(app)
      .patch("/applications/app-1/status")
      .send({
        status: "hacked",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid application status",
    });
  });

  it("refuse une transition métier interdite", async () => {
    await request(app).post("/applications").send({
      id: "app-1",
      company: "Deezer",
    });

    const response = await request(app)
      .patch("/applications/app-1/status")
      .send({
        status: "interview",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Cannot move application from draft to interview",
    });
  });

  it("retourne 404 pour une candidature inconnue", async () => {
    const response = await request(app)
      .patch("/applications/unknown-id/status")
      .send({
        status: "sent",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Application unknown-id not found",
    });
  });

  it("refuse une création sans id ou company", async () => {
    const response = await request(app).post("/applications").send({
      id: "app-1",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "id and company are required",
    });
  });
});

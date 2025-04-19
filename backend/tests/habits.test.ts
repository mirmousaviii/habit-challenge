import request from "supertest";
import app from "../src/app";
import { config } from "../src/config/config";

describe("Habit API", () => {
  let token: string;
  let habitId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: config.auth.username,
        password: config.auth.password,
      });

    token = res.body.token;
  });

  it("should return an empty array initially", async () => {
    const res = await request(app)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new habit", async () => {
    const res = await request(app)
      .post("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Habit",
        description: "Should be tested",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Habit");
    habitId = res.body.id;
  });

  it("should toggle today's completion for the habit", async () => {
    const res = await request(app)
      .patch(`/api/v1/habits/${habitId}/toggle`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.completedDates).toContainEqual(expect.any(String));
  });

  it("should delete the habit", async () => {
    const res = await request(app)
      .delete(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/v1/habits");
    expect(res.statusCode).toBe(401);
  });

  it("should return 404 for invalid habit ID", async () => {
    const res = await request(app)
      .patch("/api/v1/habits/invalid-id/toggle")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});

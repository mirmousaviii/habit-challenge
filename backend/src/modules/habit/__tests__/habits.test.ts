import request from "supertest";
import app from "@core/app";
import { config } from "@core/config";

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

    token = res.body.data.token;
  });

  it("should return an empty array initially", async () => {
    const res = await request(app)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
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
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Test Habit");
    expect(res.body.message).toBe("Habit created successfully");
    habitId = res.body.data.id;
  });

  it("should toggle today's completion for the habit", async () => {
    const res = await request(app)
      .patch(`/api/v1/habits/${habitId}/toggle`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.completedDates).toContainEqual(expect.any(String));
    expect(res.body.message).toBe("Habit status updated successfully");
  });

  it("should delete the habit", async () => {
    const res = await request(app)
      .delete(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({}); // 204 responses should have empty body
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/v1/habits");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toHaveProperty("code", "INVALID_AUTH_HEADER");
  });

  it("should return 404 for invalid habit ID", async () => {
    const res = await request(app)
      .patch("/api/v1/habits/invalid-id/toggle")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toHaveProperty("code", "HABIT_NOT_FOUND");
  });
});

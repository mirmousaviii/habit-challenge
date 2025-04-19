import request from "supertest";
import app from "@core/app";
import { config } from "@core/config";

describe("Auth API", () => {
  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: config.auth.username,
        password: config.auth.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.message).toBe("Login successful");
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "wrong",
        password: "wrong",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toHaveProperty("message", "Invalid credentials");
    expect(res.body.error).toHaveProperty("code", "INVALID_CREDENTIALS");
  });
});

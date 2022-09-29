/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Create User Controller", () => {
  it("Deve ser Possivel criar um usuario", async () => {
    const response = await request(app).post("/users").send({
      username: "test-integration",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Não deve ser possivel criar um usuário", async () => {
    await request(app).post("/users").send({
      username: "test-integration-exist",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    const response = await request(app).post("/users").send({
      username: "test-integration-exist",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    expect(response.status).toBe(400);
  });
});

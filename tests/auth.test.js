const request = require("supertest");
const mongoose = require("mongoose");

process.env.NODE_ENV = "test";

const app = require("../server");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authentication", () => {

  /*test("Register user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "msalloum1",
        password: "password_msalloum"
      });

    expect(response.statusCode).toBe(201);
  });*/

  test("Login user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: "msalloum1",
        password: "password_msalloum"
      });

    expect(response.statusCode).toBe(200);
  });

});

import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAuthor,
  mockedLogin,
  mockedLoginInvalidData,
  mockedLoginWithoutAllFields,
} from "../mocks/authors.mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/authors").send(mockedAuthor);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Successful login.");
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - Should not be able to login with invalid email or password", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedLoginInvalidData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password."
    );
  });

  test("POST /login - Should not be able to login without all required fields", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedLoginWithoutAllFields);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "password is a required field."
    );
  });
});

import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAuthor,
  mockedAuthor2,
  mockedAuthor2Patch,
  mockedAuthor2PatchInvalid,
  mockedAuthor2PatchSameEmail,
  mockedAuthorEmailAlreadyRegistered,
  mockedAuthorPasswordInvalid,
  mockedAuthorWithoutAllFields,
  mockedLogin,
  mockedLogin2,
} from "../mocks/authors.mocks";

describe("/authors", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /authors - Should be able to create an author", async () => {
    const response = await request(app).post("/authors").send(mockedAuthor);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Author registered successfully."
    );
    expect(response.body.author).toHaveProperty("id");
    expect(response.body.author).toHaveProperty(
      "firstName",
      mockedAuthor.firstName
    );
    expect(response.body.author).toHaveProperty("email", mockedAuthor.email);
    expect(response.body.author).toHaveProperty(
      "lastName",
      mockedAuthor.lastName
    );
    expect(response.body.author).toHaveProperty("age", mockedAuthor.age);
    expect(response.body.author).toHaveProperty("email", mockedAuthor.email);
    expect(response.body.author).not.toHaveProperty("password");
  });

  test("POST /authors - Should not be able to create an author without all required fields", async () => {
    const response = await request(app)
      .post("/authors")
      .send(mockedAuthorWithoutAllFields);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "lastName is a required field."
    );
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /authors - Should not be able to create an author with an already registered email", async () => {
    const response = await request(app)
      .post("/authors")
      .send(mockedAuthorEmailAlreadyRegistered);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "This email has already been registered."
    );
  });

  test("POST /authors - Should not be able to create an author with an invalid password", async () => {
    const response = await request(app)
      .post("/authors")
      .send(mockedAuthorPasswordInvalid);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "The password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character."
    );
  });

  test("GET /authors - Should be able to list all authors", async () => {
    const response = await request(app).get("/authors");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("authors");
    expect(response.body.authors).toBeInstanceOf(Array);
    expect(response.body.authors.length).toBeGreaterThan(0);
  });

  test("GET /authors/:id - Should be able to list an author", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[0].id;

    const response = await request(app).get(`/authors/${authorId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("author");
    expect(response.body.author).toHaveProperty("id", authorId);
  });

  test("GET /authors/:id - Should not be able to list an author that does not exist", async () => {
    const response = await request(app).get(
      "/authors/45789b28-d087-4e02-a432-17d43ee46975"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found.");
  });

  test("PATCH /authors/:id - Should be able to update an author", async () => {
    const createAuthorResponse = await request(app)
      .post("/authors")
      .send(mockedAuthor2);
    const authorId = createAuthorResponse.body.author.id;

    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2Patch)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Author updated successfully."
    );
    expect(response.body.author).toHaveProperty("id");
    expect(response.body.author).toHaveProperty(
      "firstName",
      mockedAuthor2.firstName
    );
    expect(response.body.author).toHaveProperty("email", mockedAuthor2.email);
    expect(response.body.author).toHaveProperty(
      "lastName",
      mockedAuthor2Patch.lastName
    );
    expect(response.body.author).toHaveProperty("age", mockedAuthor2.age);
    expect(response.body.author).not.toHaveProperty("password");
  });

  test("PATCH /authors/:id - Should not be able to update an author without authentication token", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2Patch);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("PATCH /authors/:id - Should not be able to update an author with invalid token", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2Patch)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("PATCH /authors/:id - Should not be able to update an author without being the account owner", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2Patch)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Author is not the account owner."
    );
  });

  test("PATCH /authors/:id - Should not be able to update an author that does not exist", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/authors/9f997376-8dbe-4742-90f1-bcfe066d56db`)
      .send(mockedAuthor2Patch)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found.");
  });

  test("PATCH /authors/:id - Should not be able to update an author with invalid fields", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2PatchInvalid)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "The password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character."
    );
  });

  test("PATCH /authors/:id - Should not be able to update an author with an already registered email", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/authors/${authorId}`)
      .send(mockedAuthor2PatchSameEmail)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "This email has already been registered."
    );
  });

  ///////

  test("DELETE /authors/:id - Should not be able to delete an author without authentication token", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const response = await request(app).delete(`/authors/${authorId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("DELETE /authors/:id - Should not be able to delete an author with invalid token", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const response = await request(app)
      .delete(`/authors/${authorId}`)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("DELETE /authors/:id - Should not be able to delete an author without being the account owner", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete(`/authors/${authorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Author is not the account owner."
    );
  });

  test("DELETE /authors/:id - Should not be able to delete an author that does not exist", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete(`/authors/9f997376-8dbe-4742-90f1-bcfe066d56db`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found.");
  });

  test("DELETE /authors/:id - Should be able to delete an author", async () => {
    const authors = await request(app).get("/authors");
    const authorId = authors.body.authors[1].id;

    const loginResponse = await request(app).post("/login").send(mockedLogin2);
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete(`/authors/${authorId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Author deleted successfully."
    );
  });
});

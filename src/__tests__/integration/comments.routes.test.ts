import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockedAuthor, mockedLogin } from "../mocks/authors.mocks";
import { mockedArticle } from "../mocks/articles.mocks";
import {
  mockedComment,
  mockedCommentArticleNotFound,
  mockedCommentPatch,
  mockedCommentPatchTextAlreadyRegistered,
  mockedCommentTextAlreadyRegistered,
  mockedCommentWithoutAllFields,
} from "../mocks/comments.mocks";

describe("/comments", () => {
  let connection: DataSource;
  let articleId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const createAuthorResponse = await request(app)
      .post("/authors")
      .send(mockedAuthor);
    const authorId = createAuthorResponse.body.author.id;

    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const authorToken = loginResponse.body.token;

    const createArticleResponse = await request(app)
      .post("/articles")
      .send({ ...mockedArticle, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    articleId = createArticleResponse.body.article.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /comments - Should be able to create a comment", async () => {
    const response = await request(app)
      .post("/comments")
      .send({ ...mockedComment, articleId: articleId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Comment created successfully."
    );
    expect(response.body.comment).toHaveProperty("id");
    expect(response.body.comment).toHaveProperty("text", mockedComment.text);
    expect(response.body.comment.article).toHaveProperty("id", articleId);
  });

  test("POST /comments - Should not be able to create a comment without all required fields", async () => {
    const response = await request(app)
      .post("/comments")
      .send(mockedCommentWithoutAllFields);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "articleId is a required field."
    );
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /comments - Should not be able to create a comment with a text that already exists", async () => {
    const response = await request(app)
      .post("/comments")
      .send({ ...mockedCommentTextAlreadyRegistered, articleId: articleId });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already a comment with this text."
    );
  });

  test("POST /comments - Should not be able to create a comment with an article that does not exist", async () => {
    const response = await request(app)
      .post("/comments")
      .send(mockedCommentArticleNotFound);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Article not found.");
  });

  test("GET /comments - Should be able to list all comments", async () => {
    const response = await request(app).get("/comments");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("comments");
    expect(response.body.comments).toBeInstanceOf(Array);
    expect(response.body.comments.length).toBeGreaterThan(0);
  });

  test("GET /comments/:id - Should be able to list a comment", async () => {
    const comments = await request(app).get("/comments");
    const commentId = comments.body.comments[0].id;

    const response = await request(app).get(`/comments/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("comment");
    expect(response.body.comment).toHaveProperty("id", commentId);
  });

  test("GET /comments/:id - Should not be able to list a comment that does not exist", async () => {
    const response = await request(app).get(
      "/comments/30b2ea1b-05fe-410b-ac73-74dc54153371"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Comment not found.");
  });

  test("PATCH /comments/:id - Should be able to update a comment", async () => {
    const comments = await request(app).get("/comments");
    const commentId = comments.body.comments[0].id;

    const response = await request(app)
      .patch(`/comments/${commentId}`)
      .send(mockedCommentPatch);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Comment updated successfully."
    );
    expect(response.body.comment).toHaveProperty("id");
    expect(response.body.comment).toHaveProperty(
      "text",
      mockedCommentPatch.text
    );
  });

  test("PATCH /comments/:id - Should not be able to update a comment that does not exist", async () => {
    const response = await request(app)
      .patch(`/comments/8f664f08-4e53-465c-948e-43f5c8dad91e`)
      .send(mockedCommentPatch);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Comment not found.");
  });

  test("PATCH /comments/:id - Should not be able to update a comment with a text that already exists", async () => {
    const comments = await request(app).get("/comments");
    const commentId = comments.body.comments[0].id;

    const response = await request(app)
      .patch(`/comments/${commentId}`)
      .send(mockedCommentPatchTextAlreadyRegistered);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already a comment with this text."
    );
  });

  test("DELETE /comments/:id - Should not be able to delete a comment that does not exist", async () => {
    const response = await request(app).delete(
      `/comments/df30b78a-1af8-46c0-9d2a-fc85f3225dbf`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Comment not found.");
  });

  test("DELETE /comments/:id - Should be able to delete a comment", async () => {
    const comments = await request(app).get("/comments");
    const commentId = comments.body.comments[0].id;

    const response = await request(app).delete(`/comments/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Comment deleted successfully."
    );
  });
});

import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedAuthor,
  mockedAuthor2,
  mockedLogin,
  mockedLogin2,
} from "../mocks/authors.mocks";
import {
  mockedArticle,
  mockedArticleAuthorNotFound,
  mockedArticlePatch,
  mockedArticleTitleAlreadyRegistered,
  mockedArticleWithoutAllFields,
} from "../mocks/articles.mocks";
import { mockedCategory } from "../mocks/categories.mocks";

describe("/articles", () => {
  let connection: DataSource;
  let authorToken: string;
  let authorId: string;
  let categoryId: string;

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
    authorId = createAuthorResponse.body.author.id;

    const loginResponse = await request(app).post("/login").send(mockedLogin);
    authorToken = loginResponse.body.token;

    const createCategoryResponse = await request(app)
      .post("/categories")
      .send({ ...mockedCategory, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    categoryId = createCategoryResponse.body.category.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /articles - Should be able to create an article", async () => {
    const response = await request(app)
      .post("/articles")
      .send({ ...mockedArticle, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Article created successfully."
    );
    expect(response.body.article).toHaveProperty("id");
    expect(response.body.article).toHaveProperty("title", mockedArticle.title);
    expect(response.body.article).toHaveProperty(
      "description",
      mockedArticle.description
    );
    expect(response.body.article).toHaveProperty("text", mockedArticle.text);
  });

  test("POST /articles - Should not be able to create an article without all required fields", async () => {
    const response = await request(app)
      .post("/articles")
      .send({ ...mockedArticleWithoutAllFields, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "description is a required field."
    );
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /articles - Should not be possible to create an article with a title that already exists", async () => {
    const response = await request(app)
      .post("/articles")
      .send({ ...mockedArticleTitleAlreadyRegistered, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already an article with this title."
    );
  });

  test("POST /articles - Should not be able to create an article with an author that does not exist", async () => {
    const response = await request(app)
      .post("/articles")
      .send(mockedArticleAuthorNotFound)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found.");
  });

  test("GET /articles - Should be able to list all articles", async () => {
    const response = await request(app).get("/articles");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("articles");
    expect(response.body.articles).toBeInstanceOf(Array);
    expect(response.body.articles.length).toBeGreaterThan(0);
  });

  test("GET /articles/:id - Should be able to list an article", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app).get(`/articles/${articleId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("article");
    expect(response.body.article).toHaveProperty("id", articleId);
  });

  test("GET /articles/:id - Should not be able to list an article that does not exist", async () => {
    const response = await request(app).get(
      "/articles/cd3013c6-c3e6-4588-bfe1-881e6aca881f"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Article not found.");
  });

  test("PATCH /articles/:id - Should be able to update an article", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .patch(`/articles/${articleId}`)
      .send({ ...mockedArticlePatch, categoryId: categoryId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Article updated successfully."
    );
    expect(response.body.article).toHaveProperty("id");
    expect(response.body.article).toHaveProperty(
      "description",
      mockedArticlePatch.description
    );
    expect(response.body.article).toHaveProperty(
      "description",
      mockedArticlePatch.description
    );
    expect(response.body.article).toHaveProperty("category");
    expect(response.body.article.category).toHaveProperty("id", categoryId);
  });

  test("PATCH /articles/:id - Should not be able to update an article without authentication token", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .patch(`/articles/${articleId}`)
      .send(mockedArticlePatch);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("PATCH /articles/:id - Should not be able to update an article with invalid token", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .patch(`/articles/${articleId}`)
      .send(mockedArticlePatch)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("PATCH /articles/:id - Should not be able to update an article without being the author of the article", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    await request(app).post("/authors").send(mockedAuthor2);

    const loginResponse2 = await request(app).post("/login").send(mockedLogin2);
    const authorToken2 = loginResponse2.body.token;

    const response = await request(app)
      .patch(`/articles/${articleId}`)
      .send(mockedArticlePatch)
      .set("Authorization", `Bearer ${authorToken2}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "User is not the author who wrote this article."
    );
  });

  test("PATCH /articles/:id - Should not be able to update an article that does not exist", async () => {
    const response = await request(app)
      .patch(`/articles/531203e7-6e20-46ee-847f-0d2ae0f055cf`)
      .send(mockedArticlePatch)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Article not found.");
  });

  test("PATCH /articles/:id - Should not be able to update an article with a title that already exists", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .patch(`/articles/${articleId}`)
      .send(mockedArticleTitleAlreadyRegistered)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already an article with this title."
    );
  });

  test("DELETE /articles/:id - Should not be able to delete an article without authentication token", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app).delete(`/articles/${articleId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("DELETE /articles/:id - Should not be able to delete an article with invalid token", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("DELETE /articles/:id - Should not be able to delete an article without being the author of the article", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    await request(app).post("/authors").send(mockedAuthor2);

    const loginResponse2 = await request(app).post("/login").send(mockedLogin2);
    const authorToken2 = loginResponse2.body.token;

    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${authorToken2}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "User is not the author who wrote this article."
    );
  });

  test("DELETE /articles/:id - Should not be able to delete an article that does not exist", async () => {
    const response = await request(app)
      .delete(`/articles/36cdae27-4871-4a58-bee0-e652658edfad`)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Article not found.");
  });

  test("DELETE /articles/:id - Should be able to delete an article", async () => {
    const articles = await request(app).get("/articles");
    const articleId = articles.body.articles[0].id;

    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Article deleted successfully."
    );
  });
});

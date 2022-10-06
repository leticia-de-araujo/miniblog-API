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
  mockedCategory,
  mockedCategoryAuthorNotFound,
  mockedCategoryNameAlreadyRegistered,
  mockedCategoryPatch,
  mockedCategoryPatchNameAlreadyRegistered,
  mockedCategoryWithoutAllFields,
} from "../mocks/categories.mocks";

describe("/categories", () => {
  let connection: DataSource;
  let authorToken: string;
  let authorId: string;

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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /categories - Should be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ ...mockedCategory, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Category created successfully."
    );
    expect(response.body.category).toHaveProperty("id");
    expect(response.body.category).toHaveProperty("name", mockedCategory.name);
    expect(response.body.category).toHaveProperty("type", mockedCategory.type);
    expect(response.body.category.author).toHaveProperty("id", authorId);
  });

  test("POST /categories - Should not be able to create a category without all required fields", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ ...mockedCategoryWithoutAllFields, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "type is a required field."
    );
    expect(response.body).toHaveProperty("status", "Error");
  });

  test("POST /categories - Should not be able to create a category with a name that already exists", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ ...mockedCategoryNameAlreadyRegistered, authorId: authorId })
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already a category with this name."
    );
  });

  test("POST /categories - Should not be able to create a category with an author that does not exist", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategoryAuthorNotFound)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found.");
  });

  test("POST /categories - Should not be able to create a category without authentication token", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategory);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("POST /categories - Should not be able to create a category with invalid token", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategory)
      .set("Authorization", `Bearer 7ysa7gbe6qwgr0e2`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("GET /categories - Should be able to list all categories", async () => {
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("categories");
    expect(response.body.categories).toBeInstanceOf(Array);
    expect(response.body.categories.length).toBeGreaterThan(0);
  });

  test("GET /categories/:id - Should be able to list a category", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app).get(`/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("category");
    expect(response.body.category).toHaveProperty("id", categoryId);
  });

  test("GET /categories/:id - Should not be able to list a category that does not exist", async () => {
    const response = await request(app).get(
      "/categories/d26934d2-0212-4087-9a3f-21d0b8bd4f3e"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found.");
  });

  test("PATCH /categories/:id - Should be able to update a category", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .send(mockedCategoryPatch)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Category updated successfully."
    );
    expect(response.body.category).toHaveProperty("id");
    expect(response.body.category).toHaveProperty(
      "type",
      mockedCategoryPatch.type
    );
    expect(response.body.category).toHaveProperty("id", categoryId);
  });

  test("PATCH /categories/:id - Should not be able to update a category without authentication token", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .send(mockedCategoryPatch);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("PATCH /categories/:id - Should not be able to update a category with invalid token", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .send(mockedCategoryPatch)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("PATCH /categories/:id - Should not be able to update a category without being the author that created the category", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    await request(app).post("/authors").send(mockedAuthor2);

    const loginResponse2 = await request(app).post("/login").send(mockedLogin2);
    const authorToken2 = loginResponse2.body.token;

    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .send(mockedCategoryPatch)
      .set("Authorization", `Bearer ${authorToken2}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "User is not the author that created this category."
    );
  });

  test("PATCH /categories/:id - Should not be able to update a category that does not exist", async () => {
    const response = await request(app)
      .patch(`/categories/6d21878a-d5af-45a9-a2e9-ef70d97cc984`)
      .send(mockedCategoryPatch)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found.");
  });

  test("PATCH /categories/:id - Should not be able to update a category with a name that already exists", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .patch(`/categories/${categoryId}`)
      .send(mockedCategoryPatchNameAlreadyRegistered)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      "There is already a category with this name."
    );
  });

  test("DELETE /categories/:id - Should not be able to delete a category without authentication token", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app).delete(`/categories/${categoryId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Missing authorization token."
    );
  });

  test("DELETE /categories/:id - Should not be able to delete a category with invalid token", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .delete(`/categories/${categoryId}`)
      .set("Authorization", `Bearer 1234567890987654321`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token.");
  });

  test("DELETE /categories/:id - Should not be able to delete a category without being the author that created the category", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    await request(app).post("/authors").send(mockedAuthor2);

    const loginResponse2 = await request(app).post("/login").send(mockedLogin2);
    const authorToken2 = loginResponse2.body.token;

    const response = await request(app)
      .delete(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${authorToken2}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "User is not the author that created this category."
    );
  });

  test("DELETE /categories/:id - Should not be able to delete a category that does not exist", async () => {
    const response = await request(app)
      .delete(`/categories/a35831bb-0a9f-4375-8a3c-87ca7d5150ec`)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Category not found.");
  });

  test("DELETE /categories/:id - Should be able to delete a category", async () => {
    const categories = await request(app).get("/categories");
    const categoryId = categories.body.categories[0].id;

    const response = await request(app)
      .delete(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${authorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Category deleted successfully."
    );
  });
});

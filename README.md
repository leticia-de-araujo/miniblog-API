# MiniBlog API Documentation

## Content Table

- [MiniBlog API Documentation](#leadsoft-miniblog-api-documentation)
  - [Content Table](#content-table)
  - [1. Overview](#1-overview)
    - [1.1. Author](#11-author)
  - [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
  - [3. Getting Started](#3-getting-started)
    - [3.1. Installing Dependencies](#31-installing-dependencies)
    - [3.2. Environment Variables](#32-environment-variables)
    - [3.3. Migrations](#33-migrations)
  - [4. Authentication](#4-authentication)
  - [5. Endpoints](#5-endpoints)

---

## 1. Overview

This API was developed for a Back-End technical test.

The API was structured around 4 Entities/Tables:

- **Authors**
- **Articles**
- **Categories**
- **Comments**

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Heroku](https://www.heroku.com/)

<b>Base URL:</b> https://miniblog-leadsoft.herokuapp.com/

---

### 1.1. Author

- [Letícia de Araújo Nunes](https://www.linkedin.com/in/leticia-de-araujo-nunes/)

---

## 2. Entity Relationship Diagram

[ Back to the top ](#content-table)

![ERD](/MiniBlog.DER.png)

---

## 3. Getting Started

[ Back to the top ](#content-table)

### 3.1. Installing Dependencies

Clone the project on your machine and install dependencies with the command:

```shell
yarn
```

### 3.2. Environment Variables

Then create a **.env** file, copying the **.env.example** file format:

```shell
cp .env.example .env
```

Set your environment variables with your Postgres credentials and a new database of your choice.

### 3.3. Migrations

Run migrations with the command:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Tests

Run tests with the command:

```shell
yarn test
```

---

## 4. Authentication

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the **Bearer Token** type.

The token is generated automatically at **Author Login**.

Thus, to access routes with authentication, it is necessary to create an author and be logged in with that author.

In addition, some routes require the author to be the owner of the account, or the author who created the article or the category.

Please read each route's documentation to understand which authentications are required.

---

## 5. Endpoints

[ Back to the top ](#content-table)

### Index

- [Authors](#1-authors)
- [Login](#2-login)
- [Articles](#3-articles)
- [Categories](#4-categories)
- [Comments](#5-comments)

---

## 1. **Authors**

[ Back to endpoints index ](#index)

The Author object is defined as:

| **Field**  | **Type** | **Description**              |
| ---------- | -------- | ---------------------------- |
| id         | string   | Author's unique identifier   |
| firstName  | string   | Author's first name          |
| lastName   | string   | Author's last name           |
| age        | number   | Author's age                 |
| email      | string   | Author's email               |
| password   | string   | Author's password            |
| articles   | array    | Articles written by author   |
| categories | array    | Categories created by author |

<br>

### **Endpoints**

| **Method** | **Route**          | **Description**                               |
| ---------- | ------------------ | --------------------------------------------- |
| POST       | /authors           | Creates an author                             |
| GET        | /authors           | List all authors                              |
| GET        | /authors/:authorId | Lists an author using its ID as a parameter   |
| PATCH      | /authors/:authorId | Updates an author using its ID as a parameter |
| DELETE     | /authors/:authorId | Deletes an author using its ID as a parameter |

<br>

## POST /authors

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/authors
- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "firstName": "Sarah",
  "lastName": "Spencer",
  "age": 29,
  "email": "sarahspencer@email.com",
  "password": "HJsuiv87*"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Author registered successfully.",
  "author": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "firstName": "Sarah",
    "lastName": "Spencer",
    "age": 29,
    "email": "sarahspencer@email.com"
  }
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 409 - Email already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This email has already been registered."
}
```

#

## GET /authors

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/authors
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message":  "Successful request.",
  "authors": [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer@email.com",
      "articles": [],
      "categories": []
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

- No expected errors

<br>

#

## GET /authors/:authorId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/authors/:authorId
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request.",
  "author": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "firstName": "Sarah",
    "lastName": "Spencer",
    "age": 29,
    "email": "sarahspencer@email.com",
    "articles": [],
    "categories": []
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Author not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Author not found."
}
```

<br>

#

## PATCH /authors/:authorId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/authors/:authorId
- Authorization: Bearer Token
- User must be the owner of the account
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

**Request body example**

```json
{
  "firstName?": "Sarah",
  "lastName?": "Spencer",
  "age?": 29,
  "email?": "sarahspencer123@email.com"
}
```

- At least one field is required

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "Author updated successfully.",
  "author": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "firstName": "Sarah",
    "lastName": "Spencer",
    "age": 29,
    "email": "sarahspencer123@email.com",
    "articles": [],
    "categories": []
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - Author is not the account owner**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Author is not the account owner."
}
```

<br>

**Status 409 - Email already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This email has already been registered."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 404 - Author not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Author not found."
}
```

<br>

#

## DELETE /authors/:authorId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/authors/:authorId
- Authorization: Bearer Token
- Author must be the owner of the account
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Author deleted successfully."
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - Author is not the account owner**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Author is not the account owner."
}
```

<br>

**Status 404 - Author not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Author not found."
}
```

<br>

---

## 2. **Login**

[ Back to endpoints index ](#index)

The Login object is defined as:

| **Field** | **Type** | **Description**   |
| --------- | -------- | ----------------- |
| email     | string   | Author's email    |
| password  | string   | Author's password |

<br>

### **Endpoints**

| **Method** | **Route** | **Description** |
| ---------- | --------- | --------------- |
| POST       | /login    | Login author    |

<br>

#

## POST /login

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/login
- Authorization: None
- Content-type: application/json

**Request body example**

```json
{
  "email": "sarahspencer123@email.com",
  "password": "HJsuiv87*"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful login.",
  "token": "yJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2MjY4ODU1OCwiaWF0IjoxNjYyNjg4NTU4fQ.OONsla408_ohD5XE9b3-qfWaniZC95pgyBetmJeKViA"
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "email/password is a required field"
}
```

<br>

**Status 401 - Invalid email or password**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid email or password."
}
```

<br>

---

## 3. **Articles**

[ Back to endpoints index ](#index)

The Article object is defined as:

| **Field**   | **Type**       | **Description**           |
| ----------- | -------------- | ------------------------- |
| id          | string         | Article unique identifier |
| title       | string         | Article title             |
| description | string         | Article description       |
| text        | string         | Article text              |
| author      | object         | Article author            |
| category    | null or object | Article category          |
| comments    | array          | Article comments          |

<br>

### **Endpoints**

| **Method** | **Route**            | **Description**                                |
| ---------- | -------------------- | ---------------------------------------------- |
| POST       | /articles            | Creates an article                             |
| GET        | /articles            | List all articles                              |
| GET        | /articles/:articleId | Lists an article using its ID as a parameter   |
| PATCH      | /articles/:articleId | Updates an article using its ID as a parameter |
| DELETE     | /articles/:articleId | Deletes an article using its ID as a parameter |

<br>

## POST /articles

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/articles
- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "title": "The Little Mermaid: Why the Outdated Princess Movie Needed a Remake",
  "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
  "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
  "authorId": "d409d0ed-2e04-4682-8b23-cd0b8084c3ea"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Article created successfully.",
  "article": {
    "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
    "title": "The Little Mermaid: Why the Outdated Princess Movie Needed a Remake",
    "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
    "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
    "author": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer123@email.com"
    }
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 409 - Title already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already an article with this title."
}
```

**Status 404 - Author not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Author not found."
}
```

<br>

#

## GET /articles

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/articles
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message":  "Successful request.",
  "articles": [
    {
      "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
      "title": "The Little Mermaid: Why the Outdated Princess Movie Needed a Remake",
      "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
      "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
      "author": {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "firstName": "Sarah",
        "lastName": "Spencer",
        "age": 29,
        "email": "sarahspencer123@email.com"
      },
      "category": null,
      "comments": []
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

- No expected errors

<br>

#

## GET /articles/:articleId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/articles/:articleId
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request.",
  "article": {
    "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
    "title": "The Little Mermaid: Why the Outdated Princess Movie Needed a Remake",
    "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
    "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
    "author": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer123@email.com"
    },
    "category": null,
    "comments": []
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Article not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Article not found."
}
```

<br>

#

## PATCH /articles/:articleId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/articles/:articleId
- Authorization: Bearer Token
- User must be the article author
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

**Request body example**

```json
{
  "title?": "The Little Mermaid: Understand the 2023 remake",
  "description?": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
  "text?": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
  "categoryId?": "2e87d7cc-3541-49f9-a5e6-4030c8184a46"
}
```

- At least one field is required

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "Article updated successfully.",
  "article": {
    "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
    "title": "The Little Mermaid: Understand the 2023 remake",
    "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
    "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film.",
    "author": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer123@email.com"
    },
    "category": {
      "id": "2e87d7cc-3541-49f9-a5e6-4030c8184a46",
      "name": "Entertainment",
      "type": "Movies"
    }
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - User is not the author who wrote this article**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not the author who wrote this article."
}
```

<br>

**Status 409 - Title already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already an article with this title."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 404 - Article not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Article not found."
}
```

<br>

#

## DELETE /articles/:articleId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/articles/:articleId
- Authorization: Bearer Token
- User must be the article author
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Article deleted successfully."
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - User is not the author who wrote this article**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not the author who wrote this article."
}
```

<br>

**Status 404 - Article not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Article not found."
}
```

<br>

---

## 4. **Categories**

[ Back to endpoints index ](#index)

The Category object is defined as:

| **Field** | **Type** | **Description**            |
| --------- | -------- | -------------------------- |
| id        | string   | Category unique identifier |
| name      | string   | Category name              |
| type      | string   | Category type              |
| author    | object   | Category author            |
| articles  | array    | Articles in this category  |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                |
| ---------- | ----------------------- | ---------------------------------------------- |
| POST       | /categories             | Creates a category                             |
| GET        | /categories             | List all categories                            |
| GET        | /categories/:categoryId | Lists a category using its ID as a parameter   |
| PATCH      | /categories/:categoryId | Updates a category using its ID as a parameter |
| DELETE     | /categories/:categoryId | Deletes a category using its ID as a parameter |

<br>

## POST /categories

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/categories
- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "name": "Entertainment",
  "type": "Movies",
  "authorId": "d409d0ed-2e04-4682-8b23-cd0b8084c3ea"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Category created successfully.",
  "category": {
    "id": "9f61e25a-abb4-4bf5-a29b-d4aab8d79a2a",
    "name": "Entertainment",
    "type": "Movies",
    "author": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer123@email.com"
    }
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 409 - Name already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already a category with this name."
}
```

**Status 404 - Author not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Author not found."
}
```

<br>

#

## GET /categories

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/categories
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message":  "Successful request.",
  "categories": [
    {
      "id": "9f61e25a-abb4-4bf5-a29b-d4aab8d79a2a",
      "name": "Entertainment",
      "type": "Movies",
      "author": {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "firstName": "Sarah",
        "lastName": "Spencer",
        "age": 29,
        "email": "sarahspencer123@email.com"
      },
      "articles": []
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

- No expected errors

<br>

#

## GET /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/categories/:categoryId
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request.",
  "category": {
    "id": "9f61e25a-abb4-4bf5-a29b-d4aab8d79a2a",
    "name": "Entertainment",
    "type": "Movies",
    "author": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "firstName": "Sarah",
      "lastName": "Spencer",
      "age": 29,
      "email": "sarahspencer123@email.com"
    },
    "articles": []
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found."
}
```

<br>

#

## PATCH /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/categories/:categoryId
- Authorization: Bearer Token
- User must be the author that created the category
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

**Request body example**

```json
{
  "name?": "Entertainment",
  "type?": "Movies and TV Shows"
}
```

- At least one field is required

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "Category updated successfully.",
  "category": {
    "id": "9f61e25a-abb4-4bf5-a29b-d4aab8d79a2a",
    "name": "Entertainment",
    "type": "Movies and TV Shows"
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - User is not the author that created this category**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not the author that created this category."
}
```

<br>

**Status 409 - Name already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already a category with this name."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found."
}
```

<br>

#

## DELETE /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/categories/:categoryId
- Authorization: Bearer Token
- User must be the author that created the category
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Category deleted successfully."
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token."
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token."
}
```

<br>

**Status 401 - User is not the author that created this category**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not the author that created this category."
}
```

<br>

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found."
}
```

<br>

---

## 5. **Comments**

[ Back to endpoints index ](#index)

The Comment object is defined as:

| **Field** | **Type** | **Description**           |
| --------- | -------- | ------------------------- |
| id        | string   | Comment unique identifier |
| text      | string   | Comment text              |
| article   | object   | Article of this comment   |

<br>

### **Endpoints**

| **Method** | **Route**            | **Description**                               |
| ---------- | -------------------- | --------------------------------------------- |
| POST       | /comments            | Creates a comment                             |
| GET        | /comments            | List all comments                             |
| GET        | /comments/:commentId | Lists a comment using its ID as a parameter   |
| PATCH      | /comments/:commentId | Updates a comment using its ID as a parameter |
| DELETE     | /comments/:commentId | Deletes a comment using its ID as a parameter |

<br>

## POST /comments

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/comments
- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "text": "Loved this article!",
  "articleId": "430be73d-1159-437e-961f-d46f18505471"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Comment created successfully.",
  "comment": {
    "id": "2ef3011c-63e9-4b49-9d87-af23f5b3e676",
    "text": "Loved this article!",
    "article": {
      "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
      "title": "The Little Mermaid: Understand the 2023 remake",
      "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
      "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film."
    }
  }
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 409 - Text already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already a comment with this text."
}
```

**Status 404 - Article not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Article not found."
}
```

<br>

#

## GET /comments

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/comments
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message":  "Successful request.",
  "comments": [
    {
      "id": "2ef3011c-63e9-4b49-9d87-af23f5b3e676",
      "text": "Loved this article!",
      "article": {
        "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
        "title": "The Little Mermaid: Understand the 2023 remake",
        "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
        "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film."
      }
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

- No expected errors

<br>

#

## GET /comments/:commentId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/comments/:commentId
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request.",
  "comment": {
    "id": "2ef3011c-63e9-4b49-9d87-af23f5b3e676",
    "text": "Loved this article!",
    "article": {
      "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
      "title": "The Little Mermaid: Understand the 2023 remake",
      "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
      "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film."
    }
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Comment not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Comment not found."
}
```

<br>

#

## PATCH /comments/:commentId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/comments/:commentId
- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "text": "Really liked this article!"
}
```

- It is necessary to send a text to be able to edit a comment.

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "Comment updated successfully.",
  "comment": {
    "id": "2ef3011c-63e9-4b49-9d87-af23f5b3e676",
    "text": "Really liked this article!",
    "article": {
      "id": "b5ecc3e6-ca7e-4d5c-824a-56f1dbc1aec1",
      "title": "The Little Mermaid: Understand the 2023 remake",
      "description": "While the original Little Mermaid is considered to be a Disney classic, there are still some solid reasons warranting the 2023 remake.",
      "text": "The reimagined live-action Disney classics have become a controversial topic around the internet. Bringing favorite fairy tales to live-action is a dream come true for many and a nightmare for others. Regardless, Disney's remakes have become a guilty pleasure for many moviegoers, and sometimes have more room to develop their characters and create nuance in plot (due to modern screenwriters, longer runtimes, and more). Aladdin added more political intrigue, The Jungle Book brought innovative CGI and cameras to the industry, and Cruella updated its soundtrack and fashion. With all the praise and complaints these movies generate, audiences are wondering what Disney will add to its next live action film."
    }
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 409 - Text already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "There is already a comment with this text."
}
```

<br>

**Status 400 - Invalid data type or length**

```json
{
  "status": "Error",
  "code": 400,
  "message": "yup error message"
}
```

<br>

**Status 404 - Comment not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Comment not found."
}
```

<br>

#

## DELETE /comments/:commentId

[ Back to endpoints index ](#index)

<br>

#### Request:

- URL: https://miniblog-leadsoft.herokuapp.com/comments/:commentId
- Authorization: None
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Comment deleted successfully."
}
```

<br>

#### Expected Errors:

<br>

**Status 404 - Comment not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Comment not found."
}
```

<br>

---

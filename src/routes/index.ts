import { Express } from "express";
import articlesRoutes from "./articles.routes";
import authorsRoutes from "./authors.routes";
import categoriesRoutes from "./categories.routes";
import commentsRoutes from "./comments.routes";
import loginRoute from "./login.routes";

const appRoutes = (app: Express) => {
  app.use("/authors", authorsRoutes());
  app.use("/login", loginRoute());
  app.use("/articles", articlesRoutes());
  app.use("/categories", categoriesRoutes());
  app.use("/comments", commentsRoutes());
};

export default appRoutes;

import { Router } from "express";
import articleCreateController from "../controllers/articles/articleCreate.controller";
import authorLoginAuthMiddleware from "../middlewares/authentication/authorLoginAuth.middleware";
import {
  articleCreateMiddleware,
  articleCreateSchema,
} from "../middlewares/schemas/articles/articleCreateSchema.middleware";

const routes = Router();

const articlesRoutes = () => {
  routes.post(
    "",
    authorLoginAuthMiddleware,
    articleCreateMiddleware(articleCreateSchema),
    articleCreateController
  );

  return routes;
};

export default articlesRoutes;

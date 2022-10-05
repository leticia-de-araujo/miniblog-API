import { Router } from "express";
import articleCreateController from "../controllers/articles/articleCreate.controller";
import articleListAllController from "../controllers/articles/articleListAll.controller";
import articleListOneController from "../controllers/articles/articleListOne.controller";
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
  routes.get("", articleListAllController);
  routes.get("/:id", articleListOneController);

  return routes;
};

export default articlesRoutes;

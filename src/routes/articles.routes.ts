import { Router } from "express";
import { runInContext } from "vm";
import articleCreateController from "../controllers/articles/articleCreate.controller";
import articleListAllController from "../controllers/articles/articleListAll.controller";
import articleListOneController from "../controllers/articles/articleListOne.controller";
import articleUpdateController from "../controllers/articles/articleUpdate.controller";
import articleOwnerAuthMiddleware from "../middlewares/authentication/articleOwnerAuth.middleware";
import authorLoginAuthMiddleware from "../middlewares/authentication/authorLoginAuth.middleware";
import {
  articleCreateMiddleware,
  articleCreateSchema,
} from "../middlewares/schemas/articles/articleCreateSchema.middleware";
import {
  articleUpdateMiddleware,
  articleUpdateSchema,
} from "../middlewares/schemas/articles/articleUpdateSchema.middleware";

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
  routes.patch(
    "/:id",
    authorLoginAuthMiddleware,
    articleOwnerAuthMiddleware,
    articleUpdateMiddleware(articleUpdateSchema),
    articleUpdateController
  );

  return routes;
};

export default articlesRoutes;

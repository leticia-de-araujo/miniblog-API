import { Router } from "express";
import authorCreateController from "../controllers/authors/authorCreate.controller";
import authorListAllController from "../controllers/authors/authorListAll.controller";
import authorListOneController from "../controllers/authors/authorListOne.controller";
import {
  authorCreateMiddleware,
  authorCreateSchema,
} from "../middlewares/schemas/authors/authorCreateSchema.middleware";

const routes = Router();

const authorsRoutes = () => {
  routes.post(
    "",
    authorCreateMiddleware(authorCreateSchema),
    authorCreateController
  );
  routes.get("", authorListAllController);
  routes.get("/:id", authorListOneController);

  return routes;
};

export default authorsRoutes;

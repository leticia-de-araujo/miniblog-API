import { Router } from "express";
import authorCreateController from "../controllers/authors/authorCreate.controller";
import {
  authorCreateMiddleware,
  authorCreateSchema,
} from "../middlewares/schemas/authors/authorCreate.middleware";

const routes = Router();

const authorsRoutes = () => {
  routes.post(
    "",
    authorCreateMiddleware(authorCreateSchema),
    authorCreateController
  );

  return routes;
};

export default authorsRoutes;

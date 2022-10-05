import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import authorLoginAuthMiddleware from "../middlewares/authentication/authorLoginAuth.middleware";
import {
  categoryCreateMiddleware,
  categoryCreateSchema,
} from "../middlewares/schemas/categories/categoryCreateSchema.middleware";

const routes = Router();

const categoriesRoutes = () => {
  routes.post(
    "",
    authorLoginAuthMiddleware,
    categoryCreateMiddleware(categoryCreateSchema),
    categoryCreateController
  );

  return routes;
};

export default categoriesRoutes;

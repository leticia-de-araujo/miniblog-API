import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryListAllController from "../controllers/categories/categoryListAll.controller";
import categoryListOneController from "../controllers/categories/categoryListOne.controller";
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
  routes.get("", categoryListAllController);
  routes.get("/:id", categoryListOneController);

  return routes;
};

export default categoriesRoutes;

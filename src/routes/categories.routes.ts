import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryDeleteController from "../controllers/categories/categoryDelete.controller";
import categoryListAllController from "../controllers/categories/categoryListAll.controller";
import categoryListOneController from "../controllers/categories/categoryListOne.controller";
import categoryUpdateController from "../controllers/categories/categoryUpdate.controller";
import authorLoginAuthMiddleware from "../middlewares/authentication/authorLoginAuth.middleware";
import categoryOwnerAuthMiddleware from "../middlewares/authentication/categoryOwnerAuth.middleware";
import {
  categoryCreateMiddleware,
  categoryCreateSchema,
} from "../middlewares/schemas/categories/categoryCreateSchema.middleware";
import {
  categoryUpdateMiddleware,
  categoryUpdateSchema,
} from "../middlewares/schemas/categories/categoryUpdateSchema.middleware";

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
  routes.patch(
    "/:id",
    authorLoginAuthMiddleware,
    categoryOwnerAuthMiddleware,
    categoryUpdateMiddleware(categoryUpdateSchema),
    categoryUpdateController
  );
  routes.delete(
    "/:id",
    authorLoginAuthMiddleware,
    categoryOwnerAuthMiddleware,
    categoryDeleteController
  );

  return routes;
};

export default categoriesRoutes;

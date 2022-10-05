import { Router } from "express";
import authorCreateController from "../controllers/authors/authorCreate.controller";
import authorDeleteController from "../controllers/authors/authorDelete.controller";
import authorListAllController from "../controllers/authors/authorListAll.controller";
import authorListOneController from "../controllers/authors/authorListOne.controller";
import authorUpdateController from "../controllers/authors/authorUpdate.controller";
import accountOwnerAuthMiddleware from "../middlewares/authentication/accountOwnerAuth.middleware";
import authorAuthenticationMiddleware from "../middlewares/authentication/authorLoginAuth.middleware";
import {
  authorCreateMiddleware,
  authorCreateSchema,
} from "../middlewares/schemas/authors/authorCreateSchema.middleware";
import {
  authorUpdateMiddleware,
  authorUpdateSchema,
} from "../middlewares/schemas/authors/authorUpdateSchema.middleware";

const routes = Router();

const authorsRoutes = () => {
  routes.post(
    "",
    authorCreateMiddleware(authorCreateSchema),
    authorCreateController
  );
  routes.get("", authorListAllController);
  routes.get("/:id", authorListOneController);
  routes.patch(
    "/:id",
    authorAuthenticationMiddleware,
    accountOwnerAuthMiddleware,
    authorUpdateMiddleware(authorUpdateSchema),
    authorUpdateController
  );
  routes.delete(
    "/:id",
    authorAuthenticationMiddleware,
    accountOwnerAuthMiddleware,
    authorDeleteController
  );

  return routes;
};

export default authorsRoutes;

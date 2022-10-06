import { Router } from "express";
import commentCreateController from "../controllers/comments/commentCreate.controller";
import commentDeleteController from "../controllers/comments/commentDelete.controller";
import commentListAllController from "../controllers/comments/commentListAll.controller";
import commentListOneController from "../controllers/comments/commentListOne.controller";
import commentUpdateController from "../controllers/comments/commentUpdate.controller";
import {
  commentCreateMiddleware,
  commentCreateSchema,
} from "../middlewares/schemas/comments/commentCreateSchema.middleware";
import {
  commentUpdateMiddleware,
  commentUpdateSchema,
} from "../middlewares/schemas/comments/commentUpdateSchema.middleware";

const routes = Router();

const commentsRoutes = () => {
  routes.post(
    "",
    commentCreateMiddleware(commentCreateSchema),
    commentCreateController
  );
  routes.get("", commentListAllController);
  routes.get("/:id", commentListOneController);
  routes.patch(
    "/:id",
    commentUpdateMiddleware(commentUpdateSchema),
    commentUpdateController
  );
  routes.delete("/:id", commentDeleteController);

  return routes;
};

export default commentsRoutes;

import { Router } from "express";
import commentCreateController from "../controllers/comments/commentCreate.controller";
import commentListAllController from "../controllers/comments/commentListAll.controller";
import commentListOneController from "../controllers/comments/commentListOne.controller";
import {
  commentCreateMiddleware,
  commentCreateSchema,
} from "../middlewares/schemas/comments/commentCreateSchema.middleware";

const routes = Router();

const commentsRoutes = () => {
  routes.post(
    "",
    commentCreateMiddleware(commentCreateSchema),
    commentCreateController
  );
  routes.get("", commentListAllController);
  routes.get("/:id", commentListOneController);

  return routes;
};

export default commentsRoutes;

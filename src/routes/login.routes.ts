import { Router } from "express";
import loginController from "../controllers/login/login.controller";

const routes = Router();

const loginRoute = () => {
  routes.post("", loginController);

  return routes;
};

export default loginRoute;

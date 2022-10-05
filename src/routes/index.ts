import { Express } from "express";
import authorsRoutes from "./authors.routes";
import loginRoute from "./login.routes";

const appRoutes = (app: Express) => {
  app.use("/authors", authorsRoutes());
  app.use("/login", loginRoute());
};

export default appRoutes;

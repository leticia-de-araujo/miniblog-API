import { Express } from "express";
import authorsRoutes from "./authors.routes";

const appRoutes = (app: Express) => {
  app.use("/authors", authorsRoutes());
};

export default appRoutes;

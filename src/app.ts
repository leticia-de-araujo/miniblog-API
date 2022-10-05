import express, { Request, Response } from "express";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/errors/handleError.middleware";
import "express-async-errors";
import appRoutes from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome! This API was developed for the Back-End test for LeadSoft.",
  });
});

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;

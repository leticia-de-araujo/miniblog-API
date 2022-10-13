import express, { Request, Response } from "express";
import "reflect-metadata";
import handleErrorMiddleware from "./middlewares/errors/handleError.middleware";
import "express-async-errors";
import appRoutes from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  maxAge: 1800,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

app.use(cors(corsOptions));

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

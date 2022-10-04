import express, { Request, Response } from "express";
import "reflect-metadata";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome! This API was developed for the Back-End test for LeadSoft.",
  });
});

export default app;

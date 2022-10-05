import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IArticleRequestPatch } from "../../../interfaces/articles.interface";

export const articleUpdateSchema: SchemaOf<IArticleRequestPatch> = yup
  .object()
  .shape({
    title: yup
      .string()
      .notRequired()
      .max(110, "The title field must contain a maximum of 110 characters."),
    description: yup
      .string()
      .notRequired()
      .max(
        200,
        "The description field must contain a maximum of 200 characters."
      ),
    text: yup
      .string()
      .notRequired()
      .max(
        100000,
        "The text field must contain a maximum of 100000 characters."
      ),
  });

export const articleUpdateMiddleware =
  (schema: SchemaOf<IArticleRequestPatch>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err: any) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: err.errors?.join(", "),
      });
    }
  };

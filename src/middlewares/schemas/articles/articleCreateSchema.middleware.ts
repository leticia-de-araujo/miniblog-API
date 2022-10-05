import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IArticleRequest } from "../../../interfaces/articles.interface";

export const articleCreateSchema: SchemaOf<IArticleRequest> = yup
  .object()
  .shape({
    title: yup
      .string()
      .required("title is a required field.")
      .max(110, "The title field must contain a maximum of 110 characters."),
    description: yup
      .string()
      .required("description is a required field.")
      .max(
        200,
        "The description field must contain a maximum of 200 characters."
      ),
    text: yup
      .string()
      .required("text is a required field.")
      .max(
        100000,
        "The text field must contain a maximum of 100000 characters."
      ),
    authorId: yup.string().required("authorId is a required field."),
  });

export const articleCreateMiddleware =
  (schema: SchemaOf<IArticleRequest>) =>
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

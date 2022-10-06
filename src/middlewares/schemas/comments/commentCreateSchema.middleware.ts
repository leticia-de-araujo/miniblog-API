import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICommentRequest } from "../../../interfaces/comments.interface";

export const commentCreateSchema: SchemaOf<ICommentRequest> = yup
  .object()
  .shape({
    text: yup
      .string()
      .required("text is a required field.")
      .max(2000, "The text field must contain a maximum of 2000 characters."),
    articleId: yup.string().required("articleId is a required field."),
  });

export const commentCreateMiddleware =
  (schema: SchemaOf<ICommentRequest>) =>
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

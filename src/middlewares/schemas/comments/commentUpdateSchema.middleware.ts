import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICommentRequestPatch } from "../../../interfaces/comments.interface";

export const commentUpdateSchema: SchemaOf<ICommentRequestPatch> = yup
  .object()
  .shape({
    text: yup
      .string()
      .required("It is necessary to send a text to be able to edit a comment.")
      .max(2000, "The text field must contain a maximum of 2000 characters."),
  });

export const commentUpdateMiddleware =
  (schema: SchemaOf<ICommentRequestPatch>) =>
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

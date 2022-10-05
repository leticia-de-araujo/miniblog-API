import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest } from "../../../interfaces/categories.interface";

export const categoryCreateSchema: SchemaOf<ICategoryRequest> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("name is a required field.")
      .max(50, "The name field must contain a maximum of 50 characters."),
    type: yup
      .string()
      .required("type is a required field.")
      .max(50, "The type field must contain a maximum of 50 characters."),
    authorId: yup.string().required("authorId is a required field."),
  });

export const categoryCreateMiddleware =
  (schema: SchemaOf<ICategoryRequest>) =>
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

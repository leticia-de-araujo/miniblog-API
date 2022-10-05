import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequestPatch } from "../../../interfaces/categories.interface";

export const categoryUpdateSchema: SchemaOf<ICategoryRequestPatch> = yup
  .object()
  .shape({
    name: yup
      .string()
      .notRequired()
      .max(50, "The name field must contain a maximum of 50 characters."),
    type: yup
      .string()
      .notRequired()
      .max(50, "The type field must contain a maximum of 50 characters."),
  });

export const categoryUpdateMiddleware =
  (schema: SchemaOf<ICategoryRequestPatch>) =>
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

import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAuthorRequestValidate } from "../../../interfaces/authors.interfaces";

export const authorCreateSchema: SchemaOf<IAuthorRequestValidate> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]*$/,
        "The firstName field must have only letters and spaces."
      )
      .required("firstName is a required field.")
      .max(30, "The firstName field must contain a maximum of 30 characters."),
    lastName: yup
      .string()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]*$/,
        "The lastName field must have only letters and spaces."
      )
      .required("lastName is a required field.")
      .max(50, "The lastName field must contain a maximum of 50 characters."),
    age: yup
      .number()
      .min(12, "The minimum age to register is 12 years old.")
      .required("age is a required field."),
    email: yup
      .string()
      .email("The email entered must be a valid email address.")
      .required("email is a required field.")
      .max(40, "The email field must contain a maximum of 40 characters."),
    password: yup
      .string()
      .required("password is a required field.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$+ %^&*-]).{8,}$/,
        "The password field must have at least 1 capital letter, 1 lower case letter, 1 number and 1 special character."
      ),
  });

export const authorCreateMiddleware =
  (schema: SchemaOf<IAuthorRequestValidate>) =>
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

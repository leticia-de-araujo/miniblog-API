import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { IAuthorRequest } from "../../interfaces/authors.interfaces";
import authorCreateService from "../../services/authors/authorCreate.service";
import { instanceToPlain } from "class-transformer";

const authorCreateController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age, email, password }: IAuthorRequest =
      req.body;

    const author = await authorCreateService({
      firstName,
      lastName,
      age,
      email,
      password,
    });

    return res.status(201).json({
      message: "Author registered successfully",
      author: instanceToPlain(author),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorCreateController;

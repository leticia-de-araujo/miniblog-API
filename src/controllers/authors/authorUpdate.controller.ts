import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";
import { IAuthorRequestValidate } from "../../interfaces/authors.interfaces";
import authorUpdateService from "../../services/authors/authorUpdate.service";

const authorUpdateController = async (req: Request, res: Response) => {
  try {
    const authorId = req.authorId!;

    const {
      firstName,
      lastName,
      age,
      email,
      password,
    }: IAuthorRequestValidate = req.body;

    const author = await authorUpdateService(authorId, {
      firstName,
      lastName,
      age,
      email,
      password,
    });

    return res.status(200).json({
      message: "Author updated successfully.",
      author: instanceToPlain(author),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorUpdateController;

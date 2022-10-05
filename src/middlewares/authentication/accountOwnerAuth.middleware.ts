import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";

const accountOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsId = req.params.id;

    const authorId = req.authorId!;

    const authorsRepository = AppDataSource.getRepository(Author);

    const authors = await authorsRepository.find();

    const author = authors.find((author) => author.id === paramsId);

    if (!author) {
      throw new AppError(404, "Author not found.");
    }

    if (paramsId !== authorId) {
      throw new AppError(401, "Author is not the account owner.");
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accountOwnerAuthMiddleware;

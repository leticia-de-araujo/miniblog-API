import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const categoryOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId = req.authorId!;
    const categoryId = req.params.id;

    const categoriesRepository = AppDataSource.getRepository(Category);
    const categories = await categoriesRepository.find({
      relations: {
        author: true,
      },
    });

    const category = categories.find((category) => category.id === categoryId);

    console.log(category);

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    console.log(category.author);
    console.log(category.author.id);
    console.log("/////////////////");
    console.log(authorId);

    if (category.author.id !== authorId) {
      throw new AppError(
        401,
        "User is not the author that created this category."
      );
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryOwnerAuthMiddleware;

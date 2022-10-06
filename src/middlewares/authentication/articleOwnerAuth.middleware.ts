import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";

const articleOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorId = req.authorId!;
    const articleId = req.params.id;

    const articlesRepository = AppDataSource.getRepository(Article);
    const articles = await articlesRepository.find({
      relations: {
        author: true,
      },
    });

    const article = articles.find((article) => article.id === articleId);

    if (!article) {
      throw new AppError(404, "Article not found.");
    }

    if (article.author.id !== authorId) {
      throw new AppError(401, "User is not the author who wrote this article.");
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleOwnerAuthMiddleware;

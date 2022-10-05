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
    const articles = await articlesRepository.find();

    const article = articles.find((article) => article.id === articleId);

    if (!article) {
      throw new AppError(404, "Article not found.");
    }

    // const authorsRepository = AppDataSource.getRepository(Author);
    // const authors = await authorsRepository.find();

    // const author = authors.find((author) => author.id === authorId);

    // console.log(article.author)

    // console.log("//////////")

    // console.log(author)

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

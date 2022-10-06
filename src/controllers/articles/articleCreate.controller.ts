import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";
import { IArticleRequest } from "../../interfaces/articles.interface";
import articleCreateService from "../../services/articles/articleCreate.service";

const articleCreateController = async (req: Request, res: Response) => {
  try {
    const { title, description, text, authorId, categoryId }: IArticleRequest = req.body;

    const article = await articleCreateService({
      title,
      description,
      text,
      authorId,
      categoryId
    });

    return res.status(201).json({
      message: "Article created successfully.",
      article: instanceToPlain(article),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleCreateController;

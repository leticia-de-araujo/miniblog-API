import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import AppError from "../../errors/AppError";
import { IArticleRequestPatch } from "../../interfaces/articles.interface";
import articleUpdateService from "../../services/articles/articleUpdate.service";

const articleUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, description, text }: IArticleRequestPatch = req.body;

    const article = await articleUpdateService(id, {
      title,
      description,
      text,
    });

    return res.status(200).json({
      message: "Article updated successfully.",
      article: instanceToPlain(article),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleUpdateController;

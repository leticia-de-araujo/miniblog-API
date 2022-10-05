import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";
import articleListAllService from "../../services/articles/articleListAll.service";

const articleListAllController = async (req: Request, res: Response) => {
  try {
    const articles = await articleListAllService();

    return res.status(200).json({
      message: "Successful request.",
      articles: instanceToPlain(articles),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleListAllController;

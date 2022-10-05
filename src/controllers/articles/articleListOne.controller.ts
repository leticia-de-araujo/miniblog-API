import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";
import articleListOneService from "../../services/articles/articleListOne.service";

const articleListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const article = await articleListOneService(id);

    return res.status(200).json({
      message: "Successful request.",
      article: instanceToPlain(article),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleListOneController;

import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import authorListAllService from "../../services/authors/authorListAll.service";

const authorListAllController = async (req: Request, res: Response) => {
  try {
    const authors = await authorListAllService();

    return res.status(200).json({
      message: "Successful request.",
      authors: instanceToPlain(authors),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorListAllController;

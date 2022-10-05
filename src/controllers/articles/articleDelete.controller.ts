import { Response, Request } from "express";
import AppError from "../../errors/AppError";
import articleDeleteService from "../../services/articles/articleDelete.service";

const articleDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await articleDeleteService(id);

    return res.status(200).json({
      message: "Article deleted successfully.",
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default articleDeleteController;

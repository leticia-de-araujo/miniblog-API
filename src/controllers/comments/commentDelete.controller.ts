import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import commentDeleteService from "../../services/comments/commentDelete.service";

const commentDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await commentDeleteService(id);

    return res.status(200).json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default commentDeleteController;

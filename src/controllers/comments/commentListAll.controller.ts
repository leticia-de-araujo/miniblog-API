import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import commentListAllService from "../../services/comments/commentListAll.service";

const commentListAllController = async (req: Request, res: Response) => {
  try {
    const comments = await commentListAllService();

    return res.status(200).json({
      message: "Successful request.",
      comments: comments,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default commentListAllController;

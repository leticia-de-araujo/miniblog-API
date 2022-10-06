import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { ICommentRequest } from "../../interfaces/comments.interface";
import commentCreateService from "../../services/comments/commentCreate.service";

const commentCreateController = async (req: Request, res: Response) => {
  try {
    const { text, articleId }: ICommentRequest = req.body;

    const comment = await commentCreateService({ text, articleId });

    return res.status(201).json({
      message: "Comment created successfully.",
      comment: comment,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default commentCreateController;

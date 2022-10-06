import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { ICommentRequestPatch } from "../../interfaces/comments.interface";
import commentUpdateService from "../../services/comments/commentUpdate.service";

const commentUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { text }: ICommentRequestPatch = req.body;

    const comment = await commentUpdateService(id, { text });

    return res.status(200).json({
      message: "Comment updated successfully.",
      comment: comment,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default commentUpdateController;

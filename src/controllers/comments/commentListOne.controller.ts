import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import commentListOneService from "../../services/comments/commentListOne.service";

const commentListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await commentListOneService(id);

    return res.status(200).json({
      message: "Successful request.",
      comment: comment,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default commentListOneController;

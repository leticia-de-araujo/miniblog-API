import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";

const featureOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default featureOwnerAuthMiddleware;

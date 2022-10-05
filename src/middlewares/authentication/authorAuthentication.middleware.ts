import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";

const authorAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError(401, "Missing authorization token,");
    }

    const authArray = authorization.split(" ");

    let token: string;

    if (authArray.length > 1) {
      if (authArray[0].toLowerCase() !== "bearer") {
        throw new AppError(
          400,
          "The authorization token must be of type Bearer."
        );
      }

      token = authArray[1];
    } else {
      token = authArray[0];
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError(401, "Invalid token.");
        }

        req.authorId = decoded.id;
        req.authorEmail = decoded.email;

        next();
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorAuthenticationMiddleware;

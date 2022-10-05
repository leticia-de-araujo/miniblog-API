import { instanceToPlain } from "class-transformer";
import { Response, Request } from "express";
import AppError from "../../errors/AppError";
import authorListOneService from "../../services/authors/authorListOne.service";

const authorListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const author = await authorListOneService(id);

    return res.status(200).json({
      message: "Successful request.",
      author: instanceToPlain(author),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorListOneController;

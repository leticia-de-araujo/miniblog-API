import { Response, Request } from "express";
import AppError from "../../errors/AppError";
import authorDeleteService from "../../services/authors/authorDelete.service";

const authorDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await authorDeleteService(id);

    return res.status(200).json({
      message: "Author deleted successfully.",
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default authorDeleteController;

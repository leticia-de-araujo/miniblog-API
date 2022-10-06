import { Response, Request } from "express";
import AppError from "../../errors/AppError";
import categoryDeleteService from "../../services/categories/categoryDelete.service";
const categoryDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await categoryDeleteService(id);

    return res.status(200).json({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryDeleteController;

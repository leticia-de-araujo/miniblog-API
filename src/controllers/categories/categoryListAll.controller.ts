import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import categoryListAllService from "../../services/categories/categoryListAll.service";

const categoryListAllController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryListAllService();

    return res.status(200).json({
      message: "Successful request.",
      categories: instanceToPlain(categories),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryListAllController;

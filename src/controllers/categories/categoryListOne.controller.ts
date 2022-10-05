import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import categoryListOneService from "../../services/categories/categoryListOne.service";

const categoryListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await categoryListOneService(id);

    return res.status(200).json({
      message: "Successful request.",
      category: instanceToPlain(category),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryListOneController;

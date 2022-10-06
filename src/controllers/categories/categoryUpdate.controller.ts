import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import AppError from "../../errors/AppError";
import { ICategoryRequestPatch } from "../../interfaces/categories.interface";
import categoryUpdateService from "../../services/categories/categoryUpdate.service";

const categoryUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, type }: ICategoryRequestPatch = req.body;

    const category = await categoryUpdateService(id, { name, type });

    return res.status(200).json({
      message: "Category updated successfully.",
      category: instanceToPlain(category),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryUpdateController;

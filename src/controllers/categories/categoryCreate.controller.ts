import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";
import { ICategoryRequest } from "../../interfaces/categories.interface";
import categoryCreateService from "../../services/categories/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
  try {
    const { name, type, authorId }: ICategoryRequest = req.body;

    const category = await categoryCreateService({ name, type, authorId });

    return res.status(201).json({
      message: "Category created successfully.",
      category: instanceToPlain(category),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryCreateController;

import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const categoryDeleteService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find();

  const category = categories.find((category) => category.id === id);

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  await categoriesRepository.delete(category.id);

  return true;
};

export default categoryDeleteService;

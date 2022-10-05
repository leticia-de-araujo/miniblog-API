import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const categoryListOneService = async (id: string): Promise<Category> => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find({
    relations: {
      author: true,
    },
  });

  const category = categories.find((category) => category.id === id);

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  return category;
};

export default categoryListOneService;

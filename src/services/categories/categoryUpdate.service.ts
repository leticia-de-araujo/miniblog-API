import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";
import { ICategoryRequestPatch } from "../../interfaces/categories.interface";

const categoryUpdateService = async (
  id: string,
  { name, type }: ICategoryRequestPatch
): Promise<Category> => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find();

  const category = categories.find((category) => category.id === id);

  if (!category) {
    throw new AppError(404, "Category not found.");
  }

  if (name) {
    const nameAlreadyRegistered = categories.find(
      (category) => category.name === name
    );

    if (nameAlreadyRegistered) {
      throw new AppError(409, "There is already a category with this name.");
    }
  }

  const categoryToUpdate = {
    name: name ? name : category.name,
    type: type ? type : category.type,
  };

  const categorySameData = await categoriesRepository.findOne({
    where: {
      name: categoryToUpdate.name,
      type: categoryToUpdate.type,
    },
  });

  if (categorySameData) {
    throw new AppError(
      400,
      "Cannot update a category without changes to any fields."
    );
  }

  await categoriesRepository.update(id, categoryToUpdate);

  const categoryUpdated = await categoriesRepository.findOne({
    where: {
      id: id,
    },
  });

  return categoryUpdated!;
};

export default categoryUpdateService;

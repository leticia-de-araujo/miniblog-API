import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";

const categoryListAllService = async (): Promise<Category[]> => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find({
    relations: {
      author: true,
    },
  });

  return categories;
};

export default categoryListAllService;

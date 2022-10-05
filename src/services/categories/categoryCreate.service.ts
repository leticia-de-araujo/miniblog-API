import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories.interface";

const categoryCreateService = async ({
  name,
  type,
  authorId,
}: ICategoryRequest): Promise<Category> => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categories = await categoriesRepository.find();

  const nameAlreadyRegistered = categories.find(
    (category) => category.name === name
  );

  if (nameAlreadyRegistered) {
    throw new AppError(409, "There is already a category with this name.");
  }

  const authorsRepository = AppDataSource.getRepository(Author);

  const authors = await authorsRepository.find();

  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    throw new AppError(404, "Author not found.");
  }

  const newCategory = categoriesRepository.create({
    name,
    type,
    author: author,
  });

  categoriesRepository.save(newCategory);

  return newCategory;
};

export default categoryCreateService;

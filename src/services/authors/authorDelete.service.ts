import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";

const authorDeleteService = async (id: string) => {
  const authorsRepository = AppDataSource.getRepository(Author);

  const authors = await authorsRepository.find();

  const author = authors.find((author) => author.id === id);

  if (!author) {
    throw new AppError(404, "Author not found.");
  }

  await authorsRepository.delete(author.id);

  return true;
};

export default authorDeleteService;

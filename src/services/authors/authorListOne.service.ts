import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";

const authorListOneService = async (id: string): Promise<Author> => {
  const authorsRepository = AppDataSource.getRepository(Author);

  const authors = await authorsRepository.find({
    relations: {
      articles: true,
      categories: true,
    },
  });

  const author = authors.find((author) => author.id === id);

  if (!author) {
    throw new AppError(404, "Author not found.");
  }

  return author;
};

export default authorListOneService;

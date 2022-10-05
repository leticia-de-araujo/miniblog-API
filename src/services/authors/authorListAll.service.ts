import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";

const authorListAllService = async (): Promise<Author[]> => {
  const authorRepository = AppDataSource.getRepository(Author);

  const authors = await authorRepository.find({
    relations: {
      articles: true,
      categories: true,
    },
  });

  return authors;
};

export default authorListAllService;

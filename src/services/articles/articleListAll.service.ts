import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";

const articleListAllService = async (): Promise<Article[]> => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find({
    relations: {
      author: true,
      category: true,
    },
  });

  return articles;
};

export default articleListAllService;

import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";

const articleListAllService = async (): Promise<Article[]> => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  return articles;
};

export default articleListAllService;

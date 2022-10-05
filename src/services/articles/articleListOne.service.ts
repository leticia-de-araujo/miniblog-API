import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import AppError from "../../errors/AppError";

const articleListOneService = async (id: string): Promise<Article> => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    throw new AppError(404, "Article not found.");
  }

  return article;
};

export default articleListOneService;

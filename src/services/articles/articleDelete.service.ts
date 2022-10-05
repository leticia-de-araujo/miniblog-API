import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import AppError from "../../errors/AppError";

const articleDeleteService = async (id: string) => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    throw new AppError(404, "Article not found.");
  }

  await articlesRepository.delete(article.id);

  return true;
};

export default articleDeleteService;

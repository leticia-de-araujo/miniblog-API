import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import AppError from "../../errors/AppError";
import { IArticleRequestPatch } from "../../interfaces/articles.interface";

const articleUpdateService = async (
  id: string,
  { title, description, text }: IArticleRequestPatch
): Promise<Article> => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    throw new AppError(404, "Article not found.");
  }

  if (title) {
    const titleAlreadyRegistered = articles.find(
      (article) => article.title === title
    );

    if (titleAlreadyRegistered) {
      throw new AppError(409, "There is already an article with this title.");
    }
  }

  const articleToUpdate = {
    title: title ? title : article.title,
    description: description ? description : article.description,
    text: text ? text : article.text,
  };

  const articleSameData = await articlesRepository.findOne({
    where: {
      title: articleToUpdate.title,
      description: articleToUpdate.description,
      text: articleToUpdate.text,
    },
  });

  if (articleSameData) {
    throw new AppError(
      400,
      "Cannot update an article without changes to any fields."
    );
  }

  await articlesRepository.update(id, articleToUpdate);

  const articleUpdated = await articlesRepository.findOne({
    where: {
      id: id,
    },
  });

  return articleUpdated!;
};

export default articleUpdateService;

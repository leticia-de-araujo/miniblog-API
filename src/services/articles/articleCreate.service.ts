import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import { Author } from "../../entities/authors.entity";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";
import { IArticleRequest } from "../../interfaces/articles.interface";

const articleCreateService = async ({
  title,
  description,
  text,
  authorId,
  categoryId,
}: IArticleRequest): Promise<Article> => {
  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  const titleAlreadyRegistered = articles.find(
    (article) => article.title === title
  );

  if (titleAlreadyRegistered) {
    throw new AppError(409, "There is already an article with this title.");
  }

  const authorsRepository = AppDataSource.getRepository(Author);

  const authors = await authorsRepository.find();

  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    throw new AppError(404, "Author not found.");
  }

  let category;

  if (categoryId) {
    const categoriesRepository = AppDataSource.getRepository(Category);
    const categories = await categoriesRepository.find();

    const categoryFind = categories.find(
      (category) => category.id === categoryId
    );

    if (!categoryFind) {
      throw new AppError(404, "Category not found.");
    }

    category = categoryFind;
  }

  const newArticle = articlesRepository.create({
    title,
    description,
    text,
    author,
    category,
  });

  articlesRepository.save(newArticle);

  return newArticle;
};

export default articleCreateService;

import AppDataSource from "../../data-source";
import { Article } from "../../entities/articles.entity";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";
import { ICommentRequest } from "../../interfaces/comments.interface";

const commentCreateService = async ({
  text,
  articleId,
}: ICommentRequest): Promise<Comment> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find();

  const commentAlreadyRegistered = comments.find(
    (comment) => comment.text === text
  );

  if (commentAlreadyRegistered) {
    throw new AppError(409, "There is already a comment with this text.");
  }

  const articlesRepository = AppDataSource.getRepository(Article);

  const articles = await articlesRepository.find();

  const article = articles.find((article) => article.id === articleId);

  if (!article) {
    throw new AppError(404, "Article not found.");
  }

  const newComment = commentsRepository.create({
    text,
    article: article,
  });

  commentsRepository.save(newComment);

  return newComment;
};

export default commentCreateService;

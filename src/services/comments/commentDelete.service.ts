import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";

const commentDeleteService = async (id: string) => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find();

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    throw new AppError(404, "Comment not found.");
  }

  await commentsRepository.delete(comment.id);

  return true;
};

export default commentDeleteService;

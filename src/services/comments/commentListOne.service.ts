import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";

const commentListOneService = async (id: string): Promise<Comment> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find({
    relations: {
      article: true,
    },
  });

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    throw new AppError(404, "Comment not found.");
  }

  return comment;
};

export default commentListOneService;

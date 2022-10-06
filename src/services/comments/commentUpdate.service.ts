import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import AppError from "../../errors/AppError";
import { ICommentRequestPatch } from "../../interfaces/comments.interface";

const commentUpdateService = async (
  id: string,
  { text }: ICommentRequestPatch
): Promise<Comment> => {
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

  const commentAlreadyRegistered = comments.find(
    (comment) => comment.text === text
  );

  if (commentAlreadyRegistered) {
    throw new AppError(409, "There is already a comment with this text.");
  }

  const commentToUpdate = {
    text: text ? text : comment.text,
  };

  const commentSameData = await commentsRepository.findOne({
    where: {
      text: commentToUpdate.text,
    },
  });

  if (commentSameData) {
    throw new AppError(
      400,
      "Cannot update a comment without changes to any fields."
    );
  }

  await commentsRepository.update(id, commentToUpdate);

  const commentUpdated = await commentsRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      article: true,
    },
  });

  return commentUpdated!;
};

export default commentUpdateService;

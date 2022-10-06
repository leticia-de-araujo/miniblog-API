import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";

const commentListAllService = async (): Promise<Comment[]> => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find({
    relations: {
      article: true,
    },
  });

  return comments;
};

export default commentListAllService;

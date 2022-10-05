import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";
import { IAuthorRequestPatch } from "../../interfaces/authors.interfaces";

const authorUpdateService = async (
  authorId: string,
  { firstName, lastName, age, email, password }: IAuthorRequestPatch
): Promise<Author> => {
  const authorsRepository = AppDataSource.getRepository(Author);

  const authors = await authorsRepository.find();

  const author = authors.find((author) => author.id === authorId);

  if (!author) {
    throw new AppError(404, "Author not found.");
  }

  if (email) {
    const emailAlreadyRegistered = authors.find(
      (author) => author.email === email
    );

    if (emailAlreadyRegistered) {
      throw new AppError(409, "This email has already been registered.");
    }
  }

  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 10);
  }

  const authorToUpdate = {
    firstName: firstName ? firstName : author.firstName,
    lastName: lastName ? lastName : author.lastName,
    age: age ? age : author.age,
    email: email ? email : author.email,
    password: password ? hashedPassword : author.password,
  };

  const authorSameData = await authorsRepository.findOne({
    where: {
      firstName: authorToUpdate.firstName,
      lastName: authorToUpdate.lastName,
      age: authorToUpdate.age,
      email: authorToUpdate.email,
      password: authorToUpdate.password,
    },
  });

  if (authorSameData) {
    throw new AppError(
      400,
      "Cannot update an author without changes to any fields."
    );
  }

  await authorsRepository.update(authorId, authorToUpdate);

  const authorUpdated = await authorsRepository.findOne({
    where: {
      id: authorId,
    },
  });

  return authorUpdated!;
};

export default authorUpdateService;

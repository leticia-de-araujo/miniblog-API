import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";
import AppError from "../../errors/AppError";
import { IAuthorRequest } from "../../interfaces/authors.interfaces";
import { hash } from "bcryptjs";

const authorCreateService = async ({
  firstName,
  lastName,
  age,
  email,
  password,
}: IAuthorRequest): Promise<Author> => {
  const authorRepository = AppDataSource.getRepository(Author);

  const emailAlreadyRegistered = await authorRepository.findOneBy({
    email: email,
  });

  if (emailAlreadyRegistered) {
    throw new AppError(409, "This email has already been registered.");
  }

  const hashedPassword = await hash(password, 10);

  const author = authorRepository.create({
    firstName,
    lastName,
    age,
    email,
    password: hashedPassword,
  });

  authorRepository.save(author);

  return author;
};

export default authorCreateService;

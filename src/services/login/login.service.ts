import { IAuthorLogin } from "../../interfaces/authors.interfaces";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Author } from "../../entities/authors.entity";

const loginService = async ({ email, password }: IAuthorLogin) => {
  if (!email) {
    throw new AppError(400, "email is a required field.");
  }

  if (!password) {
    throw new AppError(400, "password is a required field.");
  }

  const authorsRepository = AppDataSource.getRepository(Author);

  const author = await authorsRepository.findOneBy({ email: email });

  if (!author) {
    throw new AppError(401, "Invalid email or password.");
  }

  const passwordMatch = compareSync(password, author.password);

  if (!passwordMatch) {
    throw new AppError(401, "Invalid email or password.");
  }

  const token = jwt.sign(
    {
      id: author.id,
      email: author.email,
    },
    String(process.env.SECRET_KEY),
    { expiresIn: "4h" }
  );

  return token;
};

export default loginService;

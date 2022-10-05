import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { IAuthorLogin } from "../../interfaces/authors.interfaces";
import loginService from "../../services/login/login.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: IAuthorLogin = req.body;

    const token = await loginService({ email, password });

    return res.status(200).json({
      message: "Successful login.",
      token,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default loginController;

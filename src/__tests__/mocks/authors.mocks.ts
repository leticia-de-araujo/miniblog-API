import {
  IAuthorLogin,
  IAuthorRequest,
  IAuthorRequestPatch,
} from "../../interfaces/authors.interfaces";

export const mockedAuthor: IAuthorRequest = {
  firstName: "Paulo",
  lastName: "Silva",
  age: 30,
  email: "paulo@email.com",
  password: "Senha1234+",
};

export const mockedAuthor2: IAuthorRequest = {
  firstName: "Maria",
  lastName: "Souza",
  age: 24,
  email: "maria@email.com",
  password: "Senha1234+",
};

export const mockedAuthorWithoutAllFields: any = {
  firstName: "Paulo",
  age: 30,
  email: "paulo@email.com",
  password: "Senha1234+",
};

export const mockedAuthorEmailAlreadyRegistered: IAuthorRequest = {
  firstName: "Paulo",
  lastName: "Gomez",
  age: 26,
  email: "paulo@email.com",
  password: "Senha1234+",
};

export const mockedAuthorPasswordInvalid: IAuthorRequest = {
  firstName: "Paulo",
  lastName: "Gomez",
  age: 30,
  email: "paulo@email.com",
  password: "senha1234",
};

export const mockedLogin: IAuthorLogin = {
  email: "paulo@email.com",
  password: "Senha1234+",
};

export const mockedLogin2: IAuthorLogin = {
  email: "maria@email.com",
  password: "Senha1234+",
};

export const mockedLoginInvalidData: IAuthorLogin = {
  email: "paulo@email.com",
  password: "Senha123",
};

export const mockedLoginWithoutAllFields: any = {
  email: "paulo@email.com",
};

export const mockedAuthor2Patch: IAuthorRequestPatch = {
  lastName: "Souza da Cruz",
};

export const mockedAuthor2PatchInvalid: IAuthorRequestPatch = {
  password: "Senha",
};

export const mockedAuthor2PatchSameEmail: IAuthorRequestPatch = {
  email: "maria@email.com",
  password: "Senha123456++",
};

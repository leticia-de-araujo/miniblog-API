export interface IAuthorRequest {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface IAuthorRequestValidate {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  password?: string;
}

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface IAuthorLogin {
  email: string;
  password: string;
}

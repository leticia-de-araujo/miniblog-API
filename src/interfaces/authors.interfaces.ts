export interface IAuthorRequest {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface IAuthorRequestPatch {
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

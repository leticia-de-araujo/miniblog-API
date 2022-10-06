import {
  ICategoryRequest,
  ICategoryRequestPatch,
} from "../../interfaces/categories.interface";

export const mockedCategory: ICategoryRequest = {
  name: "Entretenimento",
  type: "Filmes",
  authorId: "some-id",
};

export const mockedCategoryWithoutAllFields: any = {
  name: "Entretenimento",
  authorId: "some-id",
};

export const mockedCategoryNameAlreadyRegistered: ICategoryRequest = {
  name: "Entretenimento",
  type: "Filmes de Ação",
  authorId: "some-id",
};

export const mockedCategoryAuthorNotFound: any = {
  name: "Tecnologia",
  type: "Programação",
  authorId: "some-id-not-found",
};

export const mockedCategoryPatch: ICategoryRequestPatch = {
  type: "Filmes e Séries",
};

export const mockedCategoryPatchNameAlreadyRegistered: ICategoryRequestPatch = {
  name: "Entretenimento",
};

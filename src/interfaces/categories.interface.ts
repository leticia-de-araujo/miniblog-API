export interface ICategoryRequest {
  name: string;
  type: string;
  authorId: string;
}

export interface ICategoryRequestPatch {
  name?: string;
  type?: string;
}

export interface ICategory {
  id: string;
  name: string;
  type: string;
  authorId: string;
}

export interface IArticleRequest {
  title: string;
  description: string;
  text: string;
  authorId: string;
  categoryId?: string | null;
}

export interface IArticleRequestPatch {
  title?: string;
  description?: string;
  text?: string;
  categoryId?: string | null;
}

export interface IArticle {
  id: string;
  title: string;
  description: string;
  text: string;
  authorId: string;
  categoryId: string | null;
}

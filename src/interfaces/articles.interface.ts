export interface IArticleRequest {
  title: string;
  description: string;
  text: string;
  authorId: string;
}

export interface IArticleRequestPatch {
  title?: string;
  description?: string;
  text?: string;
}

export interface IArticle {
  id: string;
  title: string;
  description: string;
  text: string;
  authorId: string;
}

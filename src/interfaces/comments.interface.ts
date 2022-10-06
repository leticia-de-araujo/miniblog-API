export interface ICommentRequest {
  text: string;
  articleId: string;
}

export interface ICommentRequestPatch {
  text: string;
}

export interface IComment {
  id: string;
  text: string;
  articleId: string;
}

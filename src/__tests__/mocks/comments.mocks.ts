import {
  ICommentRequest,
  ICommentRequestPatch,
} from "../../interfaces/comments.interface";

export const mockedComment: ICommentRequest = {
  text: "Adorei o artigo!",
  articleId: "some-id",
};

export const mockedCommentWithoutAllFields: any = {
  text: "Adorei o artigo!",
};

export const mockedCommentTextAlreadyRegistered: ICommentRequest = {
  text: "Adorei o artigo!",
  articleId: "some-id",
};

export const mockedCommentArticleNotFound: ICommentRequest = {
  text: "Muito legal!",
  articleId: "some-id-not-found",
};

export const mockedCommentPatch: ICommentRequestPatch = {
  text: "Muito legal!",
};

export const mockedCommentPatchTextAlreadyRegistered: ICommentRequestPatch = {
  text: "Muito legal!",
};

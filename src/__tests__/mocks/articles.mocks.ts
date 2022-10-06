import {
  IArticleRequest,
  IArticleRequestPatch,
} from "../../interfaces/articles.interface";

export const mockedArticle: IArticleRequest = {
  title: "Top 10 filmes HBO Max",
  description: "Veja os melhores filmes da Hbo Max",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat diam ut tincidunt pharetra. Donec finibus lacinia placerat. Mauris convallis efficitur ipsum non tristique. Sed lacinia nunc in ligula imperdiet, ut blandit nisi suscipit. Phasellus nec mattis nisi. Curabitur bibendum eget urna nec fermentum. Ut mattis ultricies urna a sodales. Morbi eleifend ultrices ante vel tempus. Etiam ullamcorper nibh sed elementum placerat. Praesent mattis, ipsum et condimentum consectetur, velit nulla porttitor lectus, ut rhoncus mi nunc sagittis nibh. Nunc congue tincidunt vestibulum.",
  authorId: "some-id",
};

export const mockedArticleWithoutAllFields: any = {
  title: "Top 10 filmes HBO Max",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat diam ut tincidunt pharetra. Donec finibus lacinia placerat. Mauris convallis efficitur ipsum non tristique. Sed lacinia nunc in ligula imperdiet, ut blandit nisi suscipit. Phasellus nec mattis nisi. Curabitur bibendum eget urna nec fermentum. Ut mattis ultricies urna a sodales. Morbi eleifend ultrices ante vel tempus. Etiam ullamcorper nibh sed elementum placerat. Praesent mattis, ipsum et condimentum consectetur, velit nulla porttitor lectus, ut rhoncus mi nunc sagittis nibh. Nunc congue tincidunt vestibulum.",
  authorId: "some-id",
};

export const mockedArticleTitleAlreadyRegistered: IArticleRequest = {
  title: "Top 10 filmes HBO Max",
  description: "Veja os melhores filmes da Hbo Max",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat diam ut tincidunt pharetra. Donec finibus lacinia placerat. Mauris convallis efficitur ipsum non tristique. Sed lacinia nunc in ligula imperdiet, ut blandit nisi suscipit. Phasellus nec mattis nisi. Curabitur bibendum eget urna nec fermentum. Ut mattis ultricies urna a sodales. Morbi eleifend ultrices ante vel tempus. Etiam ullamcorper nibh sed elementum placerat. Praesent mattis, ipsum et condimentum consectetur, velit nulla porttitor lectus, ut rhoncus mi nunc sagittis nibh. Nunc congue tincidunt vestibulum.",
  authorId: "some-id",
};

export const mockedArticleAuthorNotFound: IArticleRequest = {
  title: "Top 10 filmes HBO Max",
  description: "Veja os melhores filmes da Hbo Max",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat diam ut tincidunt pharetra. Donec finibus lacinia placerat. Mauris convallis efficitur ipsum non tristique. Sed lacinia nunc in ligula imperdiet, ut blandit nisi suscipit. Phasellus nec mattis nisi. Curabitur bibendum eget urna nec fermentum. Ut mattis ultricies urna a sodales. Morbi eleifend ultrices ante vel tempus. Etiam ullamcorper nibh sed elementum placerat. Praesent mattis, ipsum et condimentum consectetur, velit nulla porttitor lectus, ut rhoncus mi nunc sagittis nibh. Nunc congue tincidunt vestibulum.",
  authorId: "some-id-not-found",
};

export const mockedArticlePatch: IArticleRequestPatch = {
  description: "Conheça os filmes eleitos top 10 da HBO Max",
  categoryId: "some-id",
};

export const mockedArticlePatchTitleAlreadyRegistered: IArticleRequestPatch = {
  title: "Top 10 filmes HBO Max",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat diam ut tincidunt pharetra. Donec finibus lacinia placerat. Mauris convallis efficitur ipsum non tristique. Sed lacinia nunc in ligula imperdiet, ut blandit nisi suscipit. Phasellus nec mattis nisi. Curabitur bibendum eget urna nec fermentum. Ut mattis ultricies urna a sodales.",
};

import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Article } from "./articles.entity";

@Entity("comments")
export class Comment {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 2000, unique: true })
  text: string;

  @ManyToOne(() => Article, (article) => article.comments, { nullable: false })
  article: Article;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

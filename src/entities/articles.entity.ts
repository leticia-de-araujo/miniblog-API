import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Author } from "./authors.entity";

@Entity("articles")
export class Article {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 110, unique: true })
  title: string;

  @Column({ length: 200, unique: true })
  description: string;

  @Column({ length: 100000 })
  text: string;

  @ManyToOne(() => Author, (author) => author.articles, {
    eager: true,
    nullable: false,
  })
  author: Author;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

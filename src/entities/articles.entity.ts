import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Author } from "./authors.entity";
import { Category } from "./categories.entity";

@Entity("articles")
export class Article {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 110, unique: true })
  title: string;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 100000 })
  text: string;

  @ManyToOne(() => Author, (author) => author.articles, {
    nullable: false,
  })
  author: Author;

  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: true,
  })
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

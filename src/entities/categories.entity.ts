import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Article } from "./articles.entity";
import { Author } from "./authors.entity";

@Entity("categories")
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50 })
  type: string;

  @ManyToOne(() => Author, (author) => author.categories, { nullable: false })
  author: Author;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

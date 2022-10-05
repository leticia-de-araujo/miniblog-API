import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Article } from "./articles.entity";
import { Category } from "./categories.entity";

@Entity("authors")
export class Author {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column({ length: 40, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Category, (category) => category.author)
  categories: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

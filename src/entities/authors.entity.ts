import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

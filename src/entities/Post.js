import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity
} from "typeorm";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id;

  @Column({ type: "text" })
  postUrl;

  @Column({ type: "decimal", default: 0, scale: 2 })
  price;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

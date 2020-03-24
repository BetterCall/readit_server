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

  @Column({ type: "decimal", default: 0.4, scale: 2 })
  price;

  @Column({ type: "text", default: "" })
  ip;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

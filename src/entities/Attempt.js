import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity
} from "typeorm";

@Entity("attempts")
export class Attempt extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id;

  @Column({ type: "text", default: "" })
  ip;

  @Column({ type: "integer", default: 0 })
  count;

  @CreateDateColumn()
  created_at;

  @UpdateDateColumn()
  updated_at;
}

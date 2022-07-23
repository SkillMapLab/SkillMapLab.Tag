import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column({ default: 1 })
  status: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  key: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ default: true })
  status: number;
}

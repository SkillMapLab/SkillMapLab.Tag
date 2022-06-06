import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @AutoMap()
  @Column()
  key: string;
  @AutoMap()
  @Column()
  name: string;
  @AutoMap()
  @Column()
  description: string;
  @AutoMap()
  @Column({ default: 1 })
  status: number;
}

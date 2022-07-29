import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// decorators
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}

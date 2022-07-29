import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// decorators
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}

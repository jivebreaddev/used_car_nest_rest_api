import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// decorators
@Entity()
export class User {
  @PrimaryGeneratedColumn() // decorator will decide the type // usually write out migration file // no synchronize in production
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}

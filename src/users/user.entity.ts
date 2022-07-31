import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';
// decorators
@Entity()
export class User {
  @PrimaryGeneratedColumn() // decorator will decide the type // usually write out migration file // no synchronize in production
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  // report table will add a column of userid
}

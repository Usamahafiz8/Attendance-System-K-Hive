import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  Id: Number;
  @Column()
  Status: String;
  @Column()
  Date: String;
  @Column()
  Time: String;

  //Many attendace can belong to single Employee
  @ManyToOne(() => Employee, (employee) => employee.Attendance)
  employee: Employee;

  // @ManyToOne(() => User, (user) => user.todos)
  // user: User;
}

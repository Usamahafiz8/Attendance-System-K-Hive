import { Attendance } from "src/attendance/entities/attendance.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    Name: String;
    @Column()
    Email:String;
    @Column()
    Department:String;
    // Attendance: any;

    //one emp has multiple attendance
    @OneToMany(()=>Attendance, (attendance) => attendance.employee)
    Attendance : Attendance[];

    // @OneToMany(() => Todo, (todo) => todo.user)
    // todos: Todo[];
}

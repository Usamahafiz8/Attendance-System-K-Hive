import { Entity, EntityRepository, Repository } from "typeorm";
import { Attendance } from "../entities/attendance.entity";
@EntityRepository(Attendance)
export class attendanceRepository extends Repository<Attendance> {}

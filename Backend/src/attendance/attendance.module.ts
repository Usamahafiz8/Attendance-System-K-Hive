import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { attendanceRepository } from './repo/attendance.repository';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports:[TypeOrmModule.forFeature([attendanceRepository]), EmployeeModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports:[AttendanceService]
})
export class AttendanceModule {}

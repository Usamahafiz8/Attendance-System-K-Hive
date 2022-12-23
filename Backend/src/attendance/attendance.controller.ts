import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { attendanceRepository } from './repo/attendance.repository';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post(':Id') //this will create a attenadance
  create(
    @Body(ValidationPipe) createAttendanceDto: CreateAttendanceDto,
    @Param('Id') Id: number,
  ) {
    return this.attendanceService.create(createAttendanceDto ,Id );
  }

  // @Put (":id")
  // update(@Param('id') id: number, @Body() updateBeerDto: UpdateBeerDto) : Beer {
  //   return this..update(id, updateBeerDto);
  // }




  @Get() //this will show all data of attendance
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':Status') // this will show all data that is present
  FindAlldatabyStatus(@Param('Status') Status: string) {
    return this.attendanceService.FindAlldatabyStatus(Status);
  }

  //this is to get all the data fro the employees and attendec results
  // @Get(":id")
  // findProfile(@Param(":id")id: number){
  //   return this.attendanceService.findProfile(id)
  // }

  //find  specific attendace and employee info
  // @Get("/sf/:Id")
  // findAttendance(@Param("Id")Id: number){
  //   return this.attendanceService.findAttendace(Id)
  // }

  // @Get("/empAtt/:id")
  // findEmpAttendance(@Param("id")id: number)
  // {
  //   return this.attendanceService.findEmpAttendance(id)
  // }

  //get all employee attendace history
  @Get('/EmployeeAttendance/:id')
  findEmpAttendanceByID(@Param('id') id: number) {
    return this.attendanceService.findEmpAttendanceByID(id);
  }

  //get all employee attendance recodr in count
  @Get('/EmployeeAttendanceStats/:id')
  findEmpAttendanceByIDandStats(@Param('id') id: number) {
    return this.attendanceService.findEmpAttendanceByIDandStats(id);
  }

  //update
  // @Put(':id')
  // update(@Param('id')id:number,@Body() UpdateAttendanceDto:UpdateAttendanceDto){
  //   return this.attendanceService.update(+id,UpdateAttendanceDto)
  // }

  //delete
  // @Delete(':id')
  // delete(@Param('id')id:number)
  // {}
}

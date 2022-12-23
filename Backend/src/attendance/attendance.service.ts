import { Injectable, UnauthorizedException } from '@nestjs/common';
import e from 'express';
import { uptime } from 'process';
import { EmployeeService } from 'src/employee/employee.service';
import { getConnection } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { attendanceRepository } from './repo/attendance.repository';

//mark attance with id

//working
@Injectable()
export class AttendanceService {
  findOne: any;
  constructor(
    private attendanceRepository: attendanceRepository,
    private employeeService: EmployeeService,
  ) {}

  todayDate = new Date().toLocaleDateString();
  async create(
    createAttendanceDto: CreateAttendanceDto,
    empid: number,
  ): Promise<Attendance> {
    const data = await this.attendanceRepository.find({
      where: { employee: empid, Date: this.todayDate },
    });
    // this.attendanceRepository.update(
    //   empid, { employee: empid.toString, Date: this.todayDate }
    // );
    if (data.length <= 0) {
      //throw new UnauthorizedException("data null")
      let attendance: Attendance = new Attendance();
      attendance.Status = createAttendanceDto.Status;
      attendance.Time = createAttendanceDto.Time;
      attendance.Date = new Date().toLocaleDateString();
      attendance.employee = await this.employeeService.FindbyID(empid);
      return this.attendanceRepository.save(attendance);
    } else {
      // throw new UnauthorizedException("Data")
      // console.log(data);

      await getConnection()
        .createQueryBuilder()
        .update(Attendance)
        .set({
           Status: createAttendanceDto.Status
           })
        .where({ employee: empid, Date: this.todayDate })
        .execute();

      //return this.data
      //console.log(typeof {data});
      //  D=  attendanceRepository()

      // (await data).forEach(element => {
      //   console.log(element.Id);
      //   console.log(element.Id);
      //   let ID = element.Id
      // (await
      //return this.data
      //console.log(typeof {data});
      //  D=  attendanceRepository()
      // (await data).forEach(element => {
      //   console.log(element.Id);
      //   console.log(element.Id);
      //   let ID = element.Id
      //   (data)).forEach((e)=>{
      // const heii = this.attendanceRepository.findOne(e);

      // return  heii;

      // })
      // (await heii).Status = createAttendanceDto.Status;

      //  heii.Time = createAttendanceDto.Time
      //  heii.Status = createAttendanceDto.Status
      //  });

      //throw new UnauthorizedException("else condition")
      // return  this.attendanceRepository.save({
      //   Status: createAttendanceDto.Status,
      //   Date: new Date().toLocaleDateString(),
      //   Time: createAttendanceDto.Time,
      //      });

      // let attendance: Attendance = new Attendance();
      // attendance.Status = UpdateAttendanceDto.Status;
      // attendance.Time = UpdateAttendanceDto.Time;
      // attendance.Date = UpdateAttendanceDto.Date; //new Date().toLocaleDateString();
      // attendance.employee = await this.employeeService.FindbyID(id );
      // return this.attendanceRepository.save(attendance);
    }
    // return data;

    //let attendance: Attendance = new Attendance();
    //attendance.Status = createAttendanceDto.Status;
    // attendance.Time = createAttendanceDto.Time;
    // attendance.Date = createAttendanceDto.Date; //new Date().toLocaleDateString();
    // attendance.employee = await this.employeeService.FindbyID(id );
    // return this.attendanceRepository.save(attendance);
  }

  // async createOrUpdate(createAttendanceDto: CreateAttendanceDto, id: number) {
  //   let attendance: Attendance = new Attendance();
  //   // let flag = false;

  //   attendance = await this.attendanceRepository.findOne({
  //     employee: { id: id },
  //     Date: new Date().toLocaleDateString(),
  //   });
  //   console.log({ createAttendanceDto: createAttendanceDto });
  //   attendance.Status = createAttendanceDto.Status;

  //   if (attendance) {
  //     return this.attendanceRepository.save( {
  //       id,
  //       Status: createAttendanceDto.Status,
  //       Date :new Date().toLocaleDateString(),
  //       Time:createAttendanceDto.Time

  //     });
  //   } else {
  //   let attendace :Attendance
  //   attendance = new Attendance();
  //     attendance.Status = createAttendanceDto.Status;

  //     attendance.Time = createAttendanceDto.Time;
  //     attendance.Date= new Date().toLocaleDateString();
  //     attendance.employee = await this.employeeService.FindbyID(id);
  //     return this.attendanceRepository.save(attendance);

  //   }

  // if (flag) {

  // } else {
  // }
  //  }

  //delete

  // delete(id:number){
  //   return this.attendanceRepository.remove(+id)
  // }

  //count  Attendance Data
  async findEmpAttendanceByIDandStats(id) {
    let Present = 0;
    let Absent = 0;
    let late = 0;
    let leave = 0;
    const arrayOfAttendances = await this.attendanceRepository.find({
      where: { employee: id },
    });
    arrayOfAttendances.forEach((e) => {
      if (e.Status == 'Present') {
        Present++;
      }
      if (e.Status == 'Absent') {
        Absent++;
      }
      if (e.Status == 'late') {
        late++;
      }
      if (e.Status == 'leave') {
        leave++;
      }
    });
    return { Present: Present, Absent: Absent, late: late, leave: leave };
  }

  //this will show all the attendance of the single employee
  findEmpAttendanceByID(id) {
    return this.attendanceRepository.find(
      // {relations:["employee"],
      //   where: {Employee:{Id:id}}}
      {
        where: {
          employee: id,
          //Date : "11/15/2022"
        },
      },
    );
  }

  //this will show all the Attendance
  findAll() {
    return this.attendanceRepository.find();
  }

  // Display all Data by Status
  //Working
  FindAlldatabyStatus(Status: String) {
    return this.attendanceRepository.find({ where: { Status: Status } });
  }

  //this is to get all the data fro the employees and attendec results
  // findProfile(id: number) {
  //   return this.employeeService.findOne(id);
  // }

  //find  specific attendace and employee info
  // findAttendace(Id: number) {
  //   return this.attendanceRepository.find({
  //     relations: ['employee'],
  //     where: { Id: Id },
  //   });
  // }

  // findEmpAttendance(id) {
  //   return this.attendanceRepository.find({ where: { Id: id } });
  // }

  ///optional parameters
  //condition
  //paging
  //momment.js
  //axious

  // Displays Employee's profile which contains     ()
  // Employee info,Total Presents, Absents and lates.
  // findallInfoOfEmp(id:Number){
  //   return this.attendanceRepository.find({
  //    relations : ['Employees'],
  //    where:{id:id} })

  //update
  // async update(id: number, UpdateAttendanceDto:UpdateAttendanceDto): Promise<Attendance>{
  //   const exsiting = this.attendanceRepository.findOne(id);
  //   throw new UnauthorizedException("a;readadf");
  //   exsiting.Status = UpdateAttendanceDto.Status
  //   return exsiting;

  //let attendance: Attendance = new Attendance();
  // attendance.Status = UpdateAttendanceDto.Status;
  // attendance.Time = UpdateAttendanceDto.Time;
  // attendance.Date = Date();
  // attendance.employee = await this.employeeService.FindbyID(id);
  // return this.attendanceRepository.save(attendance);
}
//delete recode on the bases of date of specific Emplopyee

// delete(id:number){
//   let attance: Attendance
//   return this.attendanceRepository.remove(attance)
// }
//}

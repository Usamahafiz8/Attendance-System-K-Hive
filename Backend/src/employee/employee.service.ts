import { Injectable } from '@nestjs/common';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from './repo/employee.repository';

@Injectable()
export class EmployeeService {

  constructor(private EmployeeRepository: EmployeeRepository){}


//create employee
  create(createEmployeeDto: CreateEmployeeDto) {
  let emp : Employee = new Employee();
  emp.Name=createEmployeeDto.Name;
  emp.Email=createEmployeeDto.Email;
  emp.Department=createEmployeeDto.Department;  
    return this.EmployeeRepository.save(emp);
  }

  //Display All Employees
  findAll() {
    return this.EmployeeRepository.find();
  }
  //Display Employee by ID
  findOne(id: number) {
    return this.EmployeeRepository.findOne(id);
  }

  //for attendance
  FindbyID(id:Number){
    return this.EmployeeRepository.findOneOrFail({where:{id:id}});
  }
  

  //find by Name
  findAdminByName(Name:String){
    return this.EmployeeRepository.findOne({where:{Name:Name}});
  }

  // update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //   return `This action updates a #${id} employee`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employee`;
  // }
}

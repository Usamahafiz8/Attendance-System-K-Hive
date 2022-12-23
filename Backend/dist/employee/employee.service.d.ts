import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { EmployeeRepository } from './repo/employee.repository';
export declare class EmployeeService {
    private EmployeeRepository;
    constructor(EmployeeRepository: EmployeeRepository);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    FindbyID(id: Number): Promise<Employee>;
    findAdminByName(Name: String): Promise<Employee>;
}

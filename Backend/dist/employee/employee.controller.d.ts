import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<import("./entities/employee.entity").Employee>;
    findAll(): Promise<import("./entities/employee.entity").Employee[]>;
    findOne(id: string): Promise<import("./entities/employee.entity").Employee>;
    findone(Name: String): Promise<import("./entities/employee.entity").Employee>;
}

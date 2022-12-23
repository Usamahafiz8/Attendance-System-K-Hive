import { EmployeeService } from 'src/employee/employee.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { attendanceRepository } from './repo/attendance.repository';
export declare class AttendanceService {
    private attendanceRepository;
    private employeeService;
    findOne: any;
    constructor(attendanceRepository: attendanceRepository, employeeService: EmployeeService);
    todayDate: string;
    create(createAttendanceDto: CreateAttendanceDto, empid: number): Promise<Attendance>;
    findEmpAttendanceByIDandStats(id: any): Promise<{
        Present: number;
        Absent: number;
        late: number;
        leave: number;
    }>;
    findEmpAttendanceByID(id: any): Promise<Attendance[]>;
    findAll(): Promise<Attendance[]>;
    FindAlldatabyStatus(Status: String): Promise<Attendance[]>;
}

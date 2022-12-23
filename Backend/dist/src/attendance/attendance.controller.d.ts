import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto, Id: number): Promise<import("./entities/attendance.entity").Attendance>;
    findAll(): Promise<import("./entities/attendance.entity").Attendance[]>;
    FindAlldatabyStatus(Status: string): Promise<import("./entities/attendance.entity").Attendance[]>;
    findEmpAttendanceByID(id: number): Promise<import("./entities/attendance.entity").Attendance[]>;
    findEmpAttendanceByIDandStats(id: number): Promise<{
        Present: number;
        Absent: number;
        late: number;
        leave: number;
    }>;
}

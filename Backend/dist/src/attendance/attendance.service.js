"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../employee/employee.service");
const typeorm_1 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const attendance_repository_1 = require("./repo/attendance.repository");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, employeeService) {
        this.attendanceRepository = attendanceRepository;
        this.employeeService = employeeService;
        this.todayDate = new Date().toLocaleDateString();
    }
    async create(createAttendanceDto, empid) {
        const data = await this.attendanceRepository.find({
            where: { employee: empid, Date: this.todayDate },
        });
        if (data.length <= 0) {
            let attendance = new attendance_entity_1.Attendance();
            attendance.Status = createAttendanceDto.Status;
            attendance.Time = createAttendanceDto.Time;
            attendance.Date = new Date().toLocaleDateString();
            attendance.employee = await this.employeeService.FindbyID(empid);
            return this.attendanceRepository.save(attendance);
        }
        else {
            await (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(attendance_entity_1.Attendance)
                .set({
                Status: createAttendanceDto.Status
            })
                .where({ employee: empid, Date: this.todayDate })
                .execute();
        }
    }
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
    findEmpAttendanceByID(id) {
        return this.attendanceRepository.find({
            where: {
                employee: id,
            },
        });
    }
    findAll() {
        return this.attendanceRepository.find();
    }
    FindAlldatabyStatus(Status) {
        return this.attendanceRepository.find({ where: { Status: Status } });
    }
};
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attendance_repository_1.attendanceRepository,
        employee_service_1.EmployeeService])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map
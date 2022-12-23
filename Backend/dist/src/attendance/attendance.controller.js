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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    create(createAttendanceDto, Id) {
        return this.attendanceService.create(createAttendanceDto, Id);
    }
    findAll() {
        return this.attendanceService.findAll();
    }
    FindAlldatabyStatus(Status) {
        return this.attendanceService.FindAlldatabyStatus(Status);
    }
    findEmpAttendanceByID(id) {
        return this.attendanceService.findEmpAttendanceByID(id);
    }
    findEmpAttendanceByIDandStats(id) {
        return this.attendanceService.findEmpAttendanceByIDandStats(id);
    }
};
__decorate([
    (0, common_1.Post)(':Id'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto, Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Status'),
    __param(0, (0, common_1.Param)('Status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "FindAlldatabyStatus", null);
__decorate([
    (0, common_1.Get)('/EmployeeAttendance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findEmpAttendanceByID", null);
__decorate([
    (0, common_1.Get)('/EmployeeAttendanceStats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findEmpAttendanceByIDandStats", null);
AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
exports.AttendanceController = AttendanceController;
//# sourceMappingURL=attendance.controller.js.map
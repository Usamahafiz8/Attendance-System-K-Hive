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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const employee_entity_1 = require("./entities/employee.entity");
const employee_repository_1 = require("./repo/employee.repository");
let EmployeeService = class EmployeeService {
    constructor(EmployeeRepository) {
        this.EmployeeRepository = EmployeeRepository;
    }
    create(createEmployeeDto) {
        let emp = new employee_entity_1.Employee();
        emp.Name = createEmployeeDto.Name;
        emp.Email = createEmployeeDto.Email;
        emp.Department = createEmployeeDto.Department;
        return this.EmployeeRepository.save(emp);
    }
    findAll() {
        return this.EmployeeRepository.find();
    }
    findOne(id) {
        return this.EmployeeRepository.findOne(id);
    }
    FindbyID(id) {
        return this.EmployeeRepository.findOneOrFail({ where: { id: id } });
    }
    findAdminByName(Name) {
        return this.EmployeeRepository.findOne({ where: { Name: Name } });
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map
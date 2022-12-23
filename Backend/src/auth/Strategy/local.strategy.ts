import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport"
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { Admin } from "src/admin/admin.entity";
import { AdminService } from "src/admin/admin.service";
import { EmployeeService } from "src/employee/employee.service";
import { Employee } from "src/employee/entities/employee.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private configservice: ConfigService , private adminservice :AdminService ){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreexpiration : false,
      secretOrkey : configservice.get("JWT_KEY")
    })
  }
  // async Validate(payload:any){
  //   return {
  //     username: payload.username,
  //     password: payload.password,
  //   }
  // }

  validate(username: string, password:string): Admin{
    const admin : Admin = this.adminservice.getadmin(username)
    if (admin == undefined) throw new UnauthorizedException();
    if(admin != undefined && admin.password==password) {
      return admin;
    }
  }

}




//

// export class LocalStrategy extends PassportStrategy(Strategy){
//     constructor( private employeeservice : EmployeeService){
//         super({
//             usernameField: 'email',
//             passwordField: 'password',
//           });
//     }
// //email == name
// //password == name
//     async validate(email: string, password: string): Promise<Employee> {
//         const admin: Employee = await this.employeeservice.findAdminByName(email);
//         if (admin && admin.Name == password) return admin;
//         if (admin == undefined)
//           throw new UnauthorizedException('admin Not Found : ' + email);
//         if (admin.Name != password)
//           throw new UnauthorizedException('Invalid Password');
//       }
// }


// default

// {
//   "email":"Ali",
//   "password": "Ali"
// }
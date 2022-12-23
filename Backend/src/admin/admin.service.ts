import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';


@Injectable()
export class AdminService {
  public admin:Admin[]=[{
    Username: "Osama",
    password: "Osama",
  }]

getadmin(Username:string) : Admin{
  return this.admin.find((admin)=>admin.Username===Username)
}

}

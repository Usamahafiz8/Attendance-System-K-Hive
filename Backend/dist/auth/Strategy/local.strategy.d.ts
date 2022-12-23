import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-local";
import { Admin } from "src/admin/admin.entity";
import { AdminService } from "src/admin/admin.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private configservice;
    private adminservice;
    constructor(configservice: ConfigService, adminservice: AdminService);
    validate(username: string, password: string): Admin;
}
export {};

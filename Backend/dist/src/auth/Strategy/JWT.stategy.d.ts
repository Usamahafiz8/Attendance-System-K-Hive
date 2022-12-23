import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        username: any;
        password: any;
    }>;
}
export {};

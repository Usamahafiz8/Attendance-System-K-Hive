import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtservice;
    constructor(jwtservice: JwtService);
    getHello(req: any): {
        token: string;
    };
}

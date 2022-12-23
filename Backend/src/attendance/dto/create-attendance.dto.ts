import { IsString } from "class-validator";


export class CreateAttendanceDto {
    @IsString()
    Status?:String;
    Time:String;
    Date?:String;
}

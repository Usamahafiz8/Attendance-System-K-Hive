import { IsString, isString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    Name: String;
    @IsString()
    Email:String;
    @IsString()
    Department:String;
    
    // @IsString()
    // Designation:String;
} 

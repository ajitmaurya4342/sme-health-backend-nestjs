
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, Length, Max, Min, min } from 'class-validator';


export class CompanyDetail {
 
    @IsNotEmpty()
    companyName: string;

    @IsNotEmpty()
    companyUEN: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    positionCompany:string;
    
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    countryCode:string;

    @Length(6, 10)
    phoneNumber: number;

    @IsArray()
    @ArrayMinSize(1)
    uploadUrl: [];
}
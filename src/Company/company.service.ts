import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { sendError } from 'src/helper';

@Injectable()
export class CompanyService {
  constructor(@InjectConnection() private readonly knex: Knex) { }
  async getCompany() {
    try {
      const data = await this.knex("ms_company");

      return {
        status: true,
        message: "Fetch Company Details",
        data,
        statusCode: 200
      };
    } catch (e) {
      return sendError(e)
    }

  }

  
  async addCompanyDetail(requestBody,companyId) {
    try {
      const { fullName, positionCompany,emailAddress, phoneNumber,uploadUrl,countryCode} = requestBody;

      await this.knex("ms_company_details").insert({
        company_id: companyId,
        full_name: fullName,
        position_company: positionCompany,
        email: emailAddress,
        phone_number: phoneNumber,
        country_code:countryCode
      });


      //File Upload 
      let createUploadArray=[
      ];

      for(let file of uploadUrl){
        createUploadArray.push({
          company_id:companyId,
          file_url:file.actual_path
        })
      }
    
      await this.knex("ms_company_file_url").insert(createUploadArray);
      
      return {
        status: true,
        message: "Company Detail Created Successfully",
        statusCode: 201
      };
    } catch (e) {
      return sendError(e)
    }

  }

  async addCompany(requestBody) {
    try {
      const { companyName, companyUEN } = requestBody;
      let [company_id]= await this.knex("ms_company").insert({
        company_name: companyName,
        company_uen: companyUEN,
      });

     await this.addCompanyDetail(requestBody,company_id)

      return {
        status: true,
        message: "Created Successfully",
        statusCode: 201
      };
    } catch (e) {
      return sendError(e)
    }

  }
}

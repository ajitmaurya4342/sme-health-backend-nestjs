import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDetail } from './companyDetail.dto';
import { sendResponse } from 'src/helper';



@Controller()
export class CompanyController {
  constructor( private readonly companyService: CompanyService,
  ) {
    }

  @Get('get-company')
  getCompany(@Res() res: Response): object {
    return sendResponse(this.companyService.getCompany(),res);
  }

  @Post ('add-company')
  addCompany(@Body() requestBody: CompanyDetail, @Res() res: Response): object {
  return sendResponse(this.companyService.addCompany(requestBody),res)
  }
}

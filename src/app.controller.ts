import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // Upload File With S3
  @Post('upload-s3-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadS3(@UploadedFile(
    new ParseFilePipeBuilder()
      // .addFileTypeValidator({ fileType: 'image/jpeg' })
      .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),) file) {
    return await this.appService.uploadS3(file);
  }


  //Upload File With Multer 
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        const fileName = `${randomName}${extname(file.originalname)}`
        file["actual_path"] = "/upload/" + fileName
        //Calling the callback passing the random name generated with the original extension name
        cb(null, fileName)
      }
    })
  }))
  public async uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      // .addFileTypeValidator({ fileType: 'image/jpeg' })
      .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) file: Express.Multer.File) {
    return {
      "status": true,
      "message": "File Uploaded Successfully",
      fileDetail: {
        ...file
      }
    }
  }
}

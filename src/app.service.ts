import { Injectable } from '@nestjs/common';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {  sendError } from './helper';
import { AWS_CONFIG } from './Config';
var fs = require('fs');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Connection Started';
  }

  async uploadS3(file) {
    const { originalname,buffer } = file;
    const {AWS_S3_BUCKET , AWS_Credential}= AWS_CONFIG;
    console.log(AWS_S3_BUCKET)
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
    const fileName = `${randomName}_${originalname}`

    const upload = new Upload({
      client: new S3Client({
        ...AWS_Credential
      }), params: {
        Bucket:AWS_S3_BUCKET,
        Key: fileName,
        Body: buffer,
      }
    });

    try {
      let s3Response = await upload.done();
      return {
        status: true,
        message: "File Uploaded Successfully",
        fileDetail: {
          ...s3Response,
          actual_path: s3Response.Location,
          originalname: s3Response.Key
        }
      };
    } catch (e) {
      sendError(e)
    }
  }

}

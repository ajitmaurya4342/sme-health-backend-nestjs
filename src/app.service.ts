import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extname } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Connection Started';
  }

  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  async uploadS3(file) {
    const { originalname } = file;
    return await this.s3Upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3Upload(file, bucket, name, mimetype) {
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
    const fileName = `${randomName}_${name}`
    const params = {
      Bucket: bucket,
      Key: String(fileName),
      Body: file,
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return {
        status: true,
        message: "File Uploaded Successfully",
        fileDetail: {
          ...s3Response,
          actual_path:s3Response.Location,
          originalname:s3Response.Key
        }
      };
    } catch (e) {
      console.log(e);
    }

  }

}

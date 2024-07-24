require("dotenv").config();

export const configObj={
    client: 'mysql2',
    connection:{
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
         port:3306
    }
};

export const AWS_CONFIG = {
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_Credential:
    {
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        }
    }
}
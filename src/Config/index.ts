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
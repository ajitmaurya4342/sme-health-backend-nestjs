import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyController } from './Company/company.controller';
import { CompanyService } from './Company/company.service';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';
import { configObj } from './Config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'upload'),
      // Tell NestJS to serve the files under ~/uploads/
      serveRoot: '/upload/',
    }),
    ConfigModule.forRoot(),
   
    KnexModule.forRoot({
      config: {
       ...configObj
      },
    }),
  ],
  controllers: [AppController,CompanyController],
  providers: [AppService,CompanyService],
})
export class AppModule {}

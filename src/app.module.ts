import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), JobsModule],
})
export class AppModule {}

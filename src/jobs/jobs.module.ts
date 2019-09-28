import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from './job.repo';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository]), AuthModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

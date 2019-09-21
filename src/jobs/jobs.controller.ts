import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
// import { Job, JobStatus } from './job.model';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';
import { JobStatusValidationPipe } from './pipes/job-status-validation.pipe';
import { Job } from './job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  // @Get()
  // getJobs(@Query(ValidationPipe) filterDto: GetJobFilterDto): Job[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.jobsService.getJobWithFilter(filterDto);
  //   } else {
  //     return this.jobsService.getAllJobs();
  //   }
  // }

  @Get('/:id')
  getJobById(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobsService.getJobById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  // @Delete('/:id')
  // deleteJob(@Param('id') id: string): void {
  //   return this.jobsService.deleteJobs(id);
  // }

  // @Patch('/:id/status')
  // updateJob(
  //   @Param('id') id: string,
  //   @Body('status', JobStatusValidationPipe) status: JobStatus,
  // ): Job {
  //   return this.jobsService.updateJob(id, status);
  // }
}

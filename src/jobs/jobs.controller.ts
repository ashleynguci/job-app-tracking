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
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
// import { Job, JobStatus } from './job.model';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';
import { JobStatusValidationPipe } from './pipes/job-status-validation.pipe';
import { Job } from './job.entity';
import { JobStatus } from './job-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
@UseGuards(AuthGuard())
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
  @Get()
  getJob(@Query(ValidationPipe) filterDto: GetJobFilterDto): Promise<Job[]> {
    return this.jobsService.getJob(filterDto);
  }

  @Get('/:id')
  getJobById(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobsService.getJobById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.createJob(createJobDto);
  }

  @Delete('/:id')
  deleteJob(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.jobsService.deleteJobs(id);
  }

  @Patch('/:id/status')
  updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', JobStatusValidationPipe) status: JobStatus,
  ): Promise<Job> {
    return this.jobsService.updateJob(id, status);
  }
}

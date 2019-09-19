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
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job, JobStatus } from './job.model';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getJobs(@Query() filterDto: GetJobFilterDto): Job[] {
    if (Object.keys(filterDto).length) {
      return this.jobsService.getJobWithFilter(filterDto);
    } else {
      return this.jobsService.getAllJobs();
    }
  }

  @Get('/:id')
  getJobById(@Param('id') id: string): Job {
    return this.jobsService.getJobById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createJob(@Body() createJobDto: CreateJobDto): Job {
    return this.jobsService.createJob(createJobDto);
  }

  @Delete('/:id')
  deleteJob(@Param('id') id: string): void {
    return this.jobsService.deleteJobs(id);
  }

  @Patch('/:id/status')
  updateJob(@Param('id') id: string, @Body('status') status: JobStatus): Job {
    return this.jobsService.updateJob(id, status);
  }
}

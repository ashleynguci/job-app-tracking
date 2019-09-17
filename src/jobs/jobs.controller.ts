import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.model';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getAllJobs(): Job[] {
    return this.jobsService.getAllJobs();
  }
  @Post()
  createJobs(
    @Body('company') company: string,
    @Body('position') position: string,
    @Body('requirements') requirements: string,
  ): Job {
    return this.jobsService.createJobs(company, position, requirements);
  }
}

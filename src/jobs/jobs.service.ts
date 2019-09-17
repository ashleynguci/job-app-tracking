import { Injectable } from '@nestjs/common';
import { Job, JobStatus } from './job.model';
import * as uuid from 'uuid/v1';
@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  getAllJobs(): Job[] {
    return this.jobs;
  }

  createJobs(company: string, position: string, requirements: string): Job {
    const job: Job = {
      id: uuid(),
      company,
      position,
      requirements,
      status: JobStatus.OPEN,
    };
    this.jobs.push(job);
    return job;
  }
}

import { Injectable } from '@nestjs/common';
import { Job, JobStatus } from './job.model';
import * as uuid from 'uuid/v1';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';
@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  getAllJobs(): Job[] {
    return this.jobs;
  }
  //return an Array

  getJobWithFilter(filterDto: GetJobFilterDto): Job[] {
    const { status, search } = filterDto;
    let jobs = this.getAllJobs();
    if (status) {
      jobs = jobs.filter(job => job.status === status);
    }
    if (search) {
      jobs = jobs.filter(
        job =>
          job.position.includes(search) || job.requirements.includes(search),
      );
    }
    return jobs;
  }
  getJobById(id: string): Job {
    return this.jobs.find(job => job.id === id);
  }
  //return an Object

  createJob(createJobDto: CreateJobDto): Job {
    const { company, position, requirements } = createJobDto;
    //deconstructuring ES6

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

  deleteJobs(id: string): void {
    this.jobs = this.jobs.filter(job => job.id !== id);
  }

  updateJob(id: string, status: JobStatus): Job {
    const job = this.getJobById(id);
    job.status = status;
    return job;
  }
}

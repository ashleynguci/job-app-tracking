import { Injectable, NotFoundException } from '@nestjs/common';
// import { Job, JobStatus } from './job.model';
import * as uuid from 'uuid/v1';
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repo';
import { Job } from './job.entity';
import { JobStatus } from './job-status.enum';
@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
  ) {}
  //
  // getAllJobs(): Job[] {
  //   return this.jobs;
  // }
  // //return an Array
  // getJobWithFilter(filterDto: GetJobFilterDto): Job[] {
  //   const { status, search } = filterDto;
  //   let jobs = this.getAllJobs();
  //   if (status) {
  //     jobs = jobs.filter(job => job.status === status);
  //   }
  //   if (search) {
  //     jobs = jobs.filter(
  //       job =>
  //         job.position.includes(search) || job.requirements.includes(search),
  //     );
  //   }
  //   return jobs;
  // }
  async getJobById(id: number): Promise<Job> {
    const found = await this.jobRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return found;
  }
  // getJobById(id: string): Job {
  //   const found = this.jobs.find(job => job.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Job with ID ${id} not found`);
  //   }
  //   return found;
  // }
  // //return an Object

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    return this.jobRepository.createJob(createJobDto);
  }
  // createJob(createJobDto: CreateJobDto): Job {
  //   const { company, position, requirements } = createJobDto;
  //   //deconstructuring ES6
  //   const job: Job = {
  //     id: uuid(),
  //     company,
  //     position,
  //     requirements,
  //     status: JobStatus.OPEN,
  //   };
  //   this.jobs.push(job);
  //   return job;
  // }

  // deleteJobs(id: string): void {
  //   const found = this.getJobById(id);
  //   this.jobs = this.jobs.filter(job => job.id !== found.id);
  // }
  // updateJob(id: string, status: JobStatus): Job {
  //   const job = this.getJobById(id);
  //   job.status = status;
  //   return job;
  // }
}

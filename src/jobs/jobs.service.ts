import { Injectable, NotFoundException } from '@nestjs/common';
// import { Job, JobStatus } from './job.model';
//
import { CreateJobDto } from './dto/create-job.dto';
import { GetJobFilterDto } from './dto/get-job-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRepository } from './job.repo';
import { Job } from './job.entity';
import { JobStatus } from './job-status.enum';
import { User } from '../auth/user.entity';
@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
  ) {}
  async getJob(filterDto: GetJobFilterDto, user: User): Promise<Job[]> {
    return this.jobRepository.getJob(filterDto, user);
  }
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
  async getJobById(id: number, user: User): Promise<Job> {
    const found = await this.jobRepository.findOne({
      where: { id, userId: user.id },
    });
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

  async createJob(createJobDto: CreateJobDto, user: User): Promise<Job> {
    return this.jobRepository.createJob(createJobDto, user);
  }

  async deleteJobs(id: number): Promise<void> {
    const result = await this.jobRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }

  async updateJob(id: number, status: JobStatus, user: User): Promise<Job> {
    const job = await this.getJobById(id, user);
    job.status = status;
    await job.save();
    return job;
  }
}

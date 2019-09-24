import { Repository, EntityRepository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './job-status.enum';
import { GetJobFilterDto } from './dto/get-job-filter.dto';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  async getJob(filterDto: GetJobFilterDto): Promise<Job[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('job');

    if (status) {
      query.andWhere('job.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(job.position LIKE :search OR job.company LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const jobs = await query.getMany();
    return jobs;
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const { company, position, requirements } = createJobDto;
    const job = new Job();
    job.company = company;
    job.position = position;
    job.requirements = requirements;
    job.status = JobStatus.OPEN;
    await job.save();
    return job;
  }
}

import { Repository, EntityRepository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './job-status.enum';
@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const { company, position, requirements } = createJobDto;
    const job = new Job();

    job.company = company;
    (job.position = position), (job.requirements = requirements);
    job.status = JobStatus.OPEN;

    await job.save();
    return job;
  }
}

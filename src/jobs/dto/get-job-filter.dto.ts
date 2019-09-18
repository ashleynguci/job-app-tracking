import { JobStatus } from '../job.model';

export class GetJobFilterDto {
  status: JobStatus;
  search: string;
}

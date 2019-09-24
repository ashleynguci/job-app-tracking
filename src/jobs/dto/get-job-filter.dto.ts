import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
// import { JobStatusValidationPipe } from '../pipes/job-status-validation.pipe';
import { JobStatus } from '../job-status.enum';

export class GetJobFilterDto {
  @IsOptional()
  @IsIn([
    JobStatus.ACCEPTED,
    JobStatus.DECLINE,
    JobStatus.IN_PROGRESS,
    JobStatus.OPEN,
  ])
  status: JobStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

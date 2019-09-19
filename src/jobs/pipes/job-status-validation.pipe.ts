import { PipeTransform, BadRequestException } from '@nestjs/common';
import { JobStatus } from '../job.model';

export class JobStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    JobStatus.OPEN,
    JobStatus.IN_PROGRESS,
    JobStatus.ACCEPTED,
    JobStatus.DECLINE,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { JobStatus } from './job.model';
@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;
  @Column()
  position: string;

  @Column()
  requirements: string;

  @Column()
  status: JobStatus;
}

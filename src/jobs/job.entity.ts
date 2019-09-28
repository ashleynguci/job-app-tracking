import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { JobStatus } from './job-status.enum';
import { User } from '../auth/user.entity';

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

  @ManyToOne(type => User, user => user.jobs, { eager: false })
  user: User;
}

export interface Job {
  id: string;
  company: string;
  position: string;
  requirements: string;
  status: JobStatus;
}

export enum JobStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPT = 'ACCEPT',

  DECLINE = 'DECLINE',
}

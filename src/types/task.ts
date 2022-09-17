import type { Settings } from '$/blocks/video/options';

type OutputItem = {
  key: string;
  size: number;
};
export enum TaskStatus {
  PENDIND = 'PENDING',
  CONVERTING = 'CONVERTING',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Task = {
  id: string;
  file: File;
  videoKey: string;
  progress: number;
  videoUrl: string;
  downloadUrl?: string;
  status: TaskStatus;
  settings: Settings;
  outputs?: OutputItem[];
  animateDelay: number;
};
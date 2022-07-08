import { nanoid } from 'nanoid';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { uploadFile } from '$/utils';
import type { Settings } from '$/blocks/video/options';
type OutputItem = {
  key: string;
  size: number;
};
export type TaskItem = {
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
export enum TaskStatus {
  PENDIND = 'PENDING',
  CONVERTING = 'CONVERTING',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type State = {
  tasks: TaskItem[];
  addTasks: (files: File[], settings: Settings) => void;
  uploadFile: (task: TaskItem) => void;
  startTasks: (tasks: TaskItem[]) => void;
  transcode: (task: TaskItem) => void;
  checkTaskStatus: (task: any, data: any) => void;
};

let ffmpeg: FFmpeg | null = null;
const useStore = create<State>()(
  devtools(
    immer((set, get) => ({
      tasks: [],
      addTasks: (files, settings) => {
        const tasks = Array.from(files).map((file, index) => {
          const fileExtension = file.name.split('.').pop();
          const id = nanoid();
          return {
            id,
            file,
            progress: 0,
            videoUrl: URL.createObjectURL(file),
            status: TaskStatus.PENDIND,
            videoKey: `web/${id}.${fileExtension}`,
            settings,
            animateDelay: 0.05 * index,
          };
        });
        set((state) => {
          state.tasks.push(...tasks);
        });
        get().startTasks(tasks);
      },
      startTasks: async (tasks) => {
        // get().uploadFiles(tasks);
        const { uploadFile, checkTaskStatus } = get();
        for (const task of tasks) {
          await uploadFile(task);
          const response = await fetch('/api/flow', {
            method: 'POST',
            body: JSON.stringify({
              bucketName: process.env.ALI_BUCKET_NAME,
              videoKey: task.videoKey,
              // duration: task.settings.duration,
              size: task.file.size,
              fileName: task.file.name,
              targetType: [task.settings.format],
              options: {
                videoSize: task.settings?.size,
                videoBitrate: task.settings?.videoBitrate,
                videoFramerate: task.settings?.framerate,
                videoAspect: task.settings?.aspect,
                audioBitrate: task.settings?.audioBitrate,
                videoRotate: task.settings?.videoRotate,
                targetFormats: [task.settings?.format],
              },
            }),
          });
          const data = await response.json();
          checkTaskStatus(task, data);

          // await transcode(task);
        }
      },
      // 轮询接口检查任务状态
      checkTaskStatus(task, startTasksResponse: any) {
        fetch(
          `/api/flow?name=${startTasksResponse.Name}&flowName=${startTasksResponse.FlowName}`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status === 'Running') {
              get().checkTaskStatus(task, startTasksResponse);
            }
            if (data.status === 'Succeeded') {
              set((state) => {
                state.tasks.forEach((t) => {
                  if (t.id === task.id) {
                    t.status = TaskStatus.SUCCESS;
                    t.downloadUrl = data.output[0].url;
                    t.outputs = data.output;
                  }
                });
              });
            }
            if (data.status === 'Failed') {
              set((state) => {
                state.tasks.forEach((t) => {
                  if (t.id === task.id) {
                    t.status = TaskStatus.ERROR;
                  }
                });
              });
            }
          })
          .catch((err) => {
            set((state) => {
              state.tasks.forEach((t) => {
                if (t.id === task.id) {
                  t.status = TaskStatus.ERROR;
                }
              });
            });
            // TODO: 失败重试
          });
      },

      async transcode(task: TaskItem) {
        if (ffmpeg === null) {
          ffmpeg = createFFmpeg({
            log: true,
            corePath: '/ffmpeg-core/ffmpeg-core.js',
          });
        }
        if (!ffmpeg.isLoaded()) {
          await ffmpeg.load();
        }
        ffmpeg.FS('writeFile', task.file.name, await fetchFile(task.file));
        await ffmpeg.run('-i', task.file.name, 'output.mp4');
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const url = URL.createObjectURL(
          new Blob([data.buffer], { type: 'video/mp4' })
        );
        set((state) => {
          const index = state.tasks.findIndex((item) => item.id === task.id);
          if (index > -1) {
            state.tasks[index].downloadUrl = url;
            state.tasks[index].status = TaskStatus.SUCCESS;
          }
        });
      },
      uploadFile: async (task) => {
        await uploadFile(task.videoKey, task.file, {
          progress: (percent) => {
            console.log(percent, '%');

            set((state) => {
              state.tasks.forEach((t) => {
                if (t.id === task.id) {
                  t.progress = percent;
                }
              });
            });
          },
        });
        set((state) => {
          const index = state.tasks.findIndex((t) => t.id === task.id);
          if (index > -1) {
            state.tasks[index].status = TaskStatus.CONVERTING;
            state.tasks[index].progress = 100;
          }
        });
      },
    }))
  )
);

export default useStore;

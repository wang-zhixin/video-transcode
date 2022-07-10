import { nanoid } from 'nanoid';
import mine from 'mime-types';
import FileSaver from 'file-saver';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { uploadFile } from '$/utils';
import type { Settings } from '$/blocks/video/options';
import type { Task } from '$/types/task';
import { TaskStatus } from '$/types/task';
type StartFlowResponse = {
  Name: string;
  FlowName: string;
};

type State = {
  tasks: Task[];
  addTasks: (files: File[], settings: Settings) => void;
  uploadFile: (task: Task) => void;
  startTasks: (tasks: Task[]) => void;
  startFlow: (task: Task) => Promise<StartFlowResponse>;
  transcode: (task: Task) => void;
  startNextTranscode: () => void;
  checkTaskStatus: (task: any, data: any) => void;
  downloadOutput: (task: Task) => void;
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
        const { uploadFile, checkTaskStatus, startFlow, transcode } = get();
        for (const task of tasks) {
          if (task.settings.transcodeType === 'local') {
            transcode(task);
          } else {
            await uploadFile(task);
            const startFlowResponse = await startFlow(task);
            checkTaskStatus(task, startFlowResponse);
          }
        }
      },
      // 轮询接口检查任务状态
      checkTaskStatus(task, startFlowResponse: StartFlowResponse) {
        fetch(
          `/api/flow?name=${startFlowResponse.Name}&flowName=${startFlowResponse.FlowName}`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status === 'Running') {
              get().checkTaskStatus(task, startFlowResponse);
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
      async startFlow(task: Task) {
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
        return data;
      },
      async transcode(task: Task) {
        const tasks = get().tasks;
        // 本地转换一次只能运行一个任务
        if (
          tasks.some(
            (t) =>
              [TaskStatus.CONVERTING].includes(t.status) &&
              t.settings.transcodeType === 'local'
          )
        ) {
          return;
        }
        set((state) => {
          state.tasks.forEach((t) => {
            if (t.id === task.id) {
              t.status = TaskStatus.CONVERTING;
            }
          });
        });
        if (ffmpeg === null) {
          ffmpeg = createFFmpeg({
            log: process.env.NODE_ENV === 'development',
            corePath: '/ffmpeg-core/ffmpeg-core.js',
          });
        }
        if (!ffmpeg.isLoaded()) {
          await ffmpeg.load();
        }
        ffmpeg.FS('writeFile', task.file.name, await fetchFile(task.file));
        const outputPath = `${task.file.name.split('.')[0]}.${
          task.settings.format
        }`;
        await ffmpeg.run('-i', task.file.name, outputPath);
        const data = ffmpeg.FS('readFile', outputPath);
        const url = URL.createObjectURL(
          new Blob([data.buffer], {
            type: mine.lookup(outputPath) || 'video/mp4',
          })
        );
        set((state) => {
          const index = state.tasks.findIndex((item) => item.id === task.id);
          if (index > -1) {
            state.tasks[index].outputs = [
              {
                key: outputPath,
                size: data.buffer.byteLength,
              },
            ];
            state.tasks[index].downloadUrl = url;
            state.tasks[index].status = TaskStatus.SUCCESS;
          }
        });
        ffmpeg.FS('unlink', outputPath);
        get().startNextTranscode();
      },
      startNextTranscode() {
        const tasks = get().tasks;
        const task = tasks.find(
          (t) =>
            t.status === TaskStatus.PENDIND &&
            t.settings.transcodeType === 'local'
        );
        if (task) {
          get().transcode(task);
        }
      },
      uploadFile: async (task) => {
        await uploadFile(task.videoKey, task.file, {
          progress: (percent) => {
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
      downloadOutput: async (task) => {
        FileSaver.saveAs(
          task.downloadUrl!,
          task.outputs && task.outputs[0] ? task.outputs[0].key : task.file.name
        );
      },
    }))
  )
);

export default useStore;

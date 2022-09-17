import prettyBytes from 'pretty-bytes';
import useStore from '$/store/video';

import { Button } from '$/components/button';
import Progress from '$/components/progress';

import type { Task } from '$/types/task';
import { TaskStatus } from '$/types/task';
import options from '$/blocks/video/options';
import clsx from 'clsx';

type Props = {
  task: Task;
};
const TaskCard = ({ task }: Props) => {
  const downloadOutput = useStore((state) => state.downloadOutput);
  return (
    <div className={clsx('relative p-2 border-2  border-solid  shadow-card hover:shadow-hover transition-all duration-300 rounded', CardStyle[task.status])}>
      <div className='absolute top-0 right-0 bg-primary-light rounded-bl-md text-primary-dark text-xs px-2 py-1'>
        {
          options.transcodeType.options.find(
            (option) => option.value === task.settings.transcodeType
          )?.label
        }
      </div>
      <div className='truncate'>
        <span
          className='text-sm text-gray-500 cursor-default'
          title={task.file.name}
        >
          {task.file.name}
        </span>
      </div>
      <div className='text-sm text-gray-600 mt-2'>
        <span className='mr-1'>原格式: {task.file.type.split('/')[1]}</span>
        {/* 遍历settings对象 */}
        {Object.entries(task.settings).map(
          ([key, value]) =>
            value && key !== 'transcodeType' && (
              <span key={key} className='mr-1'>
                {options[key as keyof typeof options].label}: {value}
              </span>
            )
        )}
        <span>原大小：{prettyBytes(task.file.size)}</span>
        {task.outputs && (
          <span>转换后：{prettyBytes(task.outputs[0].size)}</span>
        )}
      </div>
      {task.status === TaskStatus.UPLOADING && (
        <Progress percent={task.progress} />
      )}
      <div className='flex justify-between items-center h-10 border-t border-solid border-gray-100 mt-2 pt-3'>
        {task.status === TaskStatus.PENDIND && (
          <div className='text-center text-sm text-gray-600 font-bold'>
            等待中...
          </div>
        )}
        {task.status === TaskStatus.UPLOADING && (
          <div className='text-center text-sm text-gray-600 font-bold'>
            上传中...
          </div>
        )}
        {task.status === TaskStatus.CONVERTING && (
          <div className='text-center text-sm text-gray-600 font-bold'>
            转换中...
          </div>
        )}
        {task.status === TaskStatus.ERROR && (
          <div className='text-center text-sm text-gray-600 font-bold'>
            转换失败
          </div>
        )}
        {task.status === TaskStatus.SUCCESS && (
          <>
            <div className='text-center text-sm text-gray-600 font-bold'>
              转换成功
            </div>
            {task.settings.transcodeType === 'cloud' && (
              <a
                href={task.downloadUrl}
                className='bg-primary cursor-pointer text-white px-4 py-1 leading-6 h-8 inline-block text-sm rounded-sm transition-all hover:bg-primary-dark'
              >
                下载
              </a>
            )}

            {task.settings.transcodeType === 'local' && (
              <Button
                color='primary'
                size='sm'
                variant='solid'
                onClick={() => downloadOutput(task)}
              >
                下载
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;


const CardStyle: Record<TaskStatus, string> = {
  [TaskStatus.PENDIND]: 'border-white bg-gradient-to-t from-white to-[#f3f8f5]',
  [TaskStatus.UPLOADING]: 'border-white bg-gradient-to-t from-white to-[#f3f8f5]',
  [TaskStatus.CONVERTING]: 'border-white bg-gradient-to-t from-white to-[#f3f8f5]',
  [TaskStatus.SUCCESS]: 'border-primary-dark bg-primary-100',
  [TaskStatus.ERROR]: 'bg-red-100',
}

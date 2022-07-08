import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import { motion, m, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import prettyBytes from 'pretty-bytes';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useStore, { TaskStatus } from '$/store/video';
import useSettings from '$/hooks/use-settings';
import { useToast } from '$/components/toast/use-toast';

import options, { OptionKey } from '$/blocks/video/options';
import isVideo from '$/utils/is-video';

import PlayFill from '@geist-ui/icons/playFill';
import Layout from '$/components/layout/index';
import FileDrop, { FileDropType, InputRef } from '$/blocks/file-drop';
import Progress from '$/components/progress';
import { Button } from '$/components/button';
import { Select } from '$/components/select';

const useFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const removeFile = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files]
  );
  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);
  const addFiles = useCallback((files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  }, []);
  return { files, addFiles, removeFile, clearFiles };
};
export default function VideoTranscode() {
  const inputRef = useRef<InputRef>(null!);
  const { showToast } = useToast();
  const tasks = useStore((state) => state.tasks);
  const addTasks = useStore((state) => state.addTasks);

  const { files, addFiles, removeFile, clearFiles } = useFiles();

  const onFileChange: FileDropType['onChange'] = useCallback(
    (files) => {
      if (files) {
        const videoFiles: File[] = [];
        Array.from(files).forEach((file) => {
          if (isVideo(file)) {
            videoFiles.push(file);
          } else {
            showToast({
              title: `${file.name} 不是视频文件`,
            });
          }
        });
        addFiles(videoFiles);
      }
    },
    [addFiles, showToast]
  );
  const handleStartClick = () => {
    if (files.length === 0) {
      showToast({
        title: '请先选择文件',
      });
      return;
    }
    addTasks(files, settings);
    clearFiles();
    inputRef.current.clear();
  };

  const { settings, setSetting } = useSettings();

  const isShowTask = tasks.length > 0;

  const isShowSelf = (key: OptionKey) => {
    if (key === 'format') return true;
    if (settings.format === 'mp3') {
      if (key === 'audioBitrate') return true;
      return false;
    }
    return true;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={clsx(
          'px-3 md:m-auto container transition-all duration-300 ease-in-out ',
          isShowTask
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'md:w-1/2 m-auto'
        )}
      >
        <div>
          <div className='p-8 rounded sticky top-0'>
            <FileDrop
              onChange={onFileChange}
              filesCount={files.length}
              ref={inputRef}
            />
            <div className='m-auto w-auto'>
              {Object.entries(options).map(
                ([key, value]) =>
                  isShowSelf(key as OptionKey) && (
                    <div className='mt-4' key={key}>
                      <Select<any>
                        value={settings[key as keyof typeof settings]}
                        name={key}
                        label={`${
                          options[key as keyof typeof settings].label
                        }：`}
                        onChange={(val) =>
                          setSetting(key as keyof typeof settings, val)
                        }
                        className='w-full'
                      >
                        {value.options.map(({ label, value }) => (
                          <Select.Option key={value} value={value}>
                            {label}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  )
              )}
            </div>

            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <Button
                    variant='text'
                    onClick={() => {
                      removeFile(index);
                      inputRef.current.clear();
                    }}
                  >
                    删除
                  </Button>
                </li>
              ))}
            </ul>
            <div className='mt-12 text-center'>
              <Button
                color='primary'
                className='w-48'
                variant='solid'
                onClick={handleStartClick}
              >
                开始转换
              </Button>
            </div>
          </div>
        </div>

        <div className='py-8'>
          <ul className='grid grid-cols-1 gap-6'>
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  layout
                  transition={{ duration: 0.5, delay: task.animateDelay }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  className='p-2 border-2 border-white border-solid bg-gradient-to-t from-white to-[#f3f8f5] shadow-card hover:shadow-hover transition-all duration-300 rounded'
                >
                  <div className='truncate'>
                    <span
                      className='text-sm text-gray-500 cursor-default'
                      title={task.file.name}
                    >
                      {task.file.name}
                    </span>
                  </div>
                  <div className='text-sm text-gray-600 mt-2'>
                    <span className='mr-1'>
                      原格式: {task.file.type.split('/')[1]}
                    </span>
                    {/* 遍历settings对象 */}
                    {Object.entries(task.settings).map(
                      ([key, value]) =>
                        value && (
                          <span key={key} className='mr-1'>
                            {options[key as keyof typeof options].label}:{' '}
                            {value}
                          </span>
                        )
                    )}
                    <span>原大小：{prettyBytes(task.file.size)}</span>
                    {task.outputs && (
                      <span>转换后：{prettyBytes(task.outputs[0].size)}</span>
                    )}
                  </div>
                  {/* <div className='flex'>
                    <button className='p-3 flex justify-center items-center cursor-pointer'>
                      <PlayFill color='var(--primary)' />
                    </button>
                  </div> */}
                  {/* {task.downloadUrl && <video controls src={task.downloadUrl} className="aspect-video w-full"></video>} */}

                  {task.status === TaskStatus.UPLOADING && (
                    <Progress percent={task.progress} />
                  )}
                  <div className='flex justify-between items-center h-10 border-t border-solid border-gray-100 mt-2 pt-3'>
                    {task.status === TaskStatus.PENDIND && (
                      <div className='text-center text-sm text-gray-600 font-bold'>
                        准备中...
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
                        <a
                          href={task.downloadUrl}
                          className='bg-primary cursor-pointer text-white px-4 py-1 leading-6 h-8 inline-block text-sm rounded-sm transition-all hover:bg-primary-dark'
                        >
                          下载
                        </a>
                      </>
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </DndProvider>
  );
}
VideoTranscode.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

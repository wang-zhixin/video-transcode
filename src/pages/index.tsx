import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useStore from '$/store/video';
import useSettings from '$/hooks/use-settings';
import { useToast } from '$/components/toast/use-toast';
import useNotification from '$/hooks/useNotification';

import options, { OptionKey } from '$/blocks/video/options';
import isVideo from '$/utils/is-video';
import { TaskStatus } from '$/types/task';

import Layout from '$/components/layout/index';
import FileDrop, { FileDropType, InputRef } from '$/blocks/file-drop';
import { Button } from '$/components/button';
import { Select } from '$/components/select';
import TaskCard from '$/blocks/video/task-card';
import WebNotification from '$/components/web-notification';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  const { t } = useTranslation('common')
  const { t: optionsT } = useTranslation('video-option')
  const inputRef = useRef<InputRef>(null!);
  const { showToast } = useToast();
  const tasks = useStore((state) => state.tasks);
  const addTasks = useStore((state) => state.addTasks);
  const { files, addFiles, removeFile, clearFiles } = useFiles();

  const {show, requestPermission} = useNotification();
  const onFileChange: FileDropType['onChange'] = useCallback(
    (files) => {
      if (files) {
        const videoFiles: File[] = [];
        Array.from(files).forEach((file) => {
          if (isVideo(file)) {
            videoFiles.push(file);
          } else {
            showToast({
              title: `${file.name} ${t('not-a-video-file')}`,
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
        title: t('not-select-file-tips'),
      });
      return;
    }
    requestPermission()
    addTasks(files, settings);
    clearFiles();
    inputRef.current.clear();
  };

  const { settings, setSetting } = useSettings();

  const isShowTask = tasks.length > 0;

  const isShowSelf = (key: OptionKey) => {
    if (key === 'format') return true;
    if (settings.format === 'mp3') {
      if (key === 'audioBitrate' || key === 'transcodeType') return true;
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
          <div className='py-4 md:p-8 rounded sticky top-0'>
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
                        label={
                          optionsT(options[key as keyof typeof settings].label)
                        }
                        onChange={(val) =>
                          setSetting(key as keyof typeof settings, val)
                        }
                        className='w-full'
                      >
                        {value.options.map(({ label, value }) => (
                          <Select.Option key={value} value={value}>
                            {optionsT(label)}
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
                    {t('remove')}
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
                 {t('transition')}
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
                  
                >
                  <>
                    <TaskCard task={task} />
                    {
                      task.status === TaskStatus.SUCCESS && (
                        <WebNotification title={t('notification-succeed')} body={`${task.file.name}\r\n${t('target-format')}：${task.settings.format}`} icon="/favicon.ico" />
                      )
                    }
                  </>
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


export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'video-option'])),
      // Will be passed to the page component as props
    },
  };
}

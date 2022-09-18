import { useRef, useImperativeHandle, forwardRef, Ref } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useRouter } from 'next/router'
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import FilePlus from '@geist-ui/icons/filePlus';
// import colors from "tailwindcss/colors";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import clsx from 'clsx';
export type FileDropType = {
  onDrop?: (item: { files: FileList }) => void;
  onChange: (files: FileList | null) => void;
  filesCount: number;
};

export type TextProps = {
  title: string;
  onTextClick: React.MouseEventHandler<HTMLParagraphElement>;
};

export type InputRef = {
  clear: () => void;
};
const Text: React.FC<TextProps> = (props) => {
  return (
    <p onClick={props.onTextClick} className='truncate'>
      {props.title}
    </p>
  );
};
const FileDrop = (props: FileDropType, ref: Ref<InputRef>) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: FileList }) {
        props.onChange(item.files);
        // if (props.onDrop) {
        // props.onDrop(item);
        // }
      },
      canDrop(item: any) {
        return true;
      },
      hover(item: any) {},
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [props]
  );
  const inputFile = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    clear: () => {
      if (inputFile.current) {
        inputFile.current.value = '';
      }
    },
  }));
  const handelClick = () => {
    inputFile.current?.click();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange(e.target.files);
  };
  const isActive = canDrop && isOver;
  return (
    <div
      ref={drop}
      onClick={handelClick}
      className={clsx(
        'relative cursor-pointer h-36 rounded-md border-dashed border-4   flex justify-center items-center transition duration-300',
        isActive
          ? 'text-gray-900 border-primary'
          : 'text-gray-500 border-primary'
      )}
    >
      <FilePlus
        size='48'
        className='transition duration-300'
        color='var(--primary)'
      />
      <div className={clsx('ml-2')}>
        <div>
          {isActive ? t('upload-file-active-tips'): t('upload-file-tips')}
        </div>
        {props.filesCount > 0 && <div>{props.filesCount}  {t('files-have-been-added', { text: locale == 'en-US' ? props.filesCount > 1 ? 'Files':'File' : "" })}</div>}
      </div>

      <input
        ref={inputFile}
        onChange={onChange}
        accept='video/*'
        type='file'
        multiple
        className='opacity-0 absolute -top-96'
      />
    </div>
  );
};

export default forwardRef(FileDrop);

export { Text };

// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

import { useEffect } from 'react';
import type { IToast } from './toast-context';

const useTimeout = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
};
export type ToastItemType = React.PropsWithChildren<IToast> & {
  onDismiss: (id: string) => void;
};
const ToastItem = (props: ToastItemType) => {
  useTimeout(() => {
    props.onDismiss(props.id);
  }, 3000);
  return (
    <div className='bg-black/50 text-white rounded px-5 py-2'>
      {props.title}
    </div>
  );
};

export { ToastItem };

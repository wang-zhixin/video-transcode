import { useCallback, useEffect, useState } from 'react';
import { motion, m, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import { useToast } from './use-toast';
import { ToastItem } from './toast-item';
const ToastContainer = () => {
  const [monted, setMounted] = useState(false);
  const { toasts, setToasts } = useToast();
  useEffect(() => {
    setMounted(true);
  }, []);
  const onDismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!monted) return <></>;
  return ReactDOM.createPortal(
    <ul
      className={clsx(
        `fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col items-end space-y-2`
      )}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.li
            key={toast.id}
            layout
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <ToastItem {...toast} onDismiss={onDismiss} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>,
    document.body
  );
};

export default ToastContainer;

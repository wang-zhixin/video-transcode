import { useState, useCallback, useMemo } from 'react'
import ToastContainer from './toast-container'
import {ToastContext} from './toast-context'
import type {IToast} from './toast-context'

export type ToastProviderProps = React.PropsWithChildren<{
  //
}>;

const ToastProvider =(props: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const showToast = useCallback((props: Omit<IToast, 'id'>) => {
    const toast = { ...props, id: Math.random().toString().slice(2, 8) };
    setToasts((prev) => [...prev, toast]);
  }, []);
  const contextValue = useMemo(() => ({ toasts, showToast, setToasts }), [toasts, showToast]);
  return <ToastContext.Provider value={contextValue}>
    <ToastContainer />
    {props.children}
  </ToastContext.Provider>
}

export {ToastProvider}
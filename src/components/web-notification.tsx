import useNotification, { WebNotificationOptions } from '$/hooks/useNotification';
import { useEffect, useRef } from 'react';

const WebNotification = (props: WebNotificationOptions) => {
  const { show, requestPermission } = useNotification();
  const isShow = useRef(false)
  useEffect(() => {
    if (isShow.current) return
    requestPermission()
    show(props)
    isShow.current = true
  }, [props, requestPermission, show])
  return null;
}

export default WebNotification
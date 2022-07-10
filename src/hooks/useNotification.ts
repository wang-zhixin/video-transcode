import { useRef } from 'react'
export interface WebNotificationOptions {
  /**
   * The title read-only property of the Notification interface indicates
   * the title of the notification
   *
   * @default ''
   */
  title?: string
  /**
   * The body string of the notification as specified in the constructor's
   * options parameter.
   *
   * @default ''
   */
  body?: string
  /**
   * The text direction of the notification as specified in the constructor's
   * options parameter.
   *
   * @default ''
   */
  dir?: 'auto' | 'ltr' | 'rtl'
  /**
   * The language code of the notification as specified in the constructor's
   * options parameter.
   *
   * @default DOMString
   */
  lang?: string
  /**
   * The ID of the notification(if any) as specified in the constructor's options
   * parameter.
   *
   * @default ''
   */
  tag?: string
  /**
   * The URL of the image used as an icon of the notification as specified
   * in the constructor's options parameter.
   *
   * @default ''
   */
  icon?: string
  /**
   * Specifies whether the user should be notified after a new notification
   * replaces an old one.
   *
   * @default false
   */
  renotify?: boolean
  /**
   * A boolean value indicating that a notification should remain active until the
   * user clicks or dismisses it, rather than closing automatically.
   *
   * @default false
   */
  requireInteraction?: boolean
  /**
   * The silent read-only property of the Notification interface specifies
   * whether the notification should be silent, i.e., no sounds or vibrations
   * should be issued, regardless of the device settings.
   *
   * @default false
   */
  silent?: boolean
  /**
   * Specifies a vibration pattern for devices with vibration hardware to emit.
   * A vibration pattern, as specified in the Vibration API spec
   *
   * @see https://w3c.github.io/vibration/
   */
  vibrate?: number[]
}

const useWebNotification = (defaultOptions: WebNotificationOptions = {}) => {
  const isServer = typeof window === 'undefined';
  const isSupported: boolean = !isServer && !!window.Notification 
  const notification = useRef<Notification | null>(null)
  const requestPermission = async () => {
    if (!isSupported)
      return

    if ('permission' in Notification && Notification.permission !== 'denied')
      await Notification.requestPermission()
  }

  const show = async (showOptions?: WebNotificationOptions) => {
    if(!isSupported) return
    await requestPermission()
    const options = Object.assign({}, defaultOptions, showOptions)
    notification.current = new Notification(options.title || '', options)
    notification.current.onclick = () => {
      console.log('click')
      notification.current?.close()
    }

  }
  return {
    show,
    requestPermission
  }
}

export default useWebNotification
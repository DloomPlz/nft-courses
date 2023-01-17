import { useEffect, useMemo, useState } from 'react'

import Toast from '../../components/Toast'
import ToastContext from './toast-context'

const TOAST_TIMEOUT = 5000

const ToastProvider = ({ children }) => {
  const [_toast, _setToast] = useState(null)
  const [isToastOpened, setIsToastOpened] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  /* cleanup on component dismount */
  useEffect(() => () => clearTimeout(timeoutId), [])

  const setToast = (toast) => {
    _setToast(toast)
    setIsToastOpened(true)
    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => setIsToastOpened(false), TOAST_TIMEOUT))
  }

  const clearToast = () => setIsToastOpened(false)

  return (
    <ToastContext.Provider
      value={{
        clearToast,
        setToast,
        toast: _toast,
        isToastOpened,
      }}
    >
      <>
        <Toast />
        {children}
      </>
    </ToastContext.Provider>
  )
}

export default ToastProvider

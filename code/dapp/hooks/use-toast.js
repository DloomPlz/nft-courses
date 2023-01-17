import { useContext } from 'react'

import ToastContext from '../context/toast/toast-context'

export const useToast = () => {
  const { setToast, clearToast } = useContext(ToastContext)

  return { setToast, clearToast }
}

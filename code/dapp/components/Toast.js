import { Fragment, useContext } from 'react'

import { Transition } from '@headlessui/react'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

import ToastContext from '../context/toast/toast-context'
import { classNames } from '../lib/utils'

const toastsMeta = {
  info: {
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-400',
    Icon: InformationCircleIcon,
  },
  success: {
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    Icon: CheckCircleIcon,
  },
  warning: {
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    Icon: ExclamationCircleIcon,
  },
  danger: {
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    Icon: XCircleIcon,
  },
}

export default function Toast() {
  const { clearToast, setToast, toast, isToastOpened } =
    useContext(ToastContext)

  if (!toast) {
    return null
  }

  /*
  // Auto-close after X seconds
  useEffect(() => {
    return () => {
      clearTimeout(currentTimeout)
      currentTimeout = setTimeout(() => {
        setToast({ open: false })
      }, 7000)
    }
  }, [displayToast.content])
  */

  const { Icon, ...toastMeta } = toastsMeta[toast.type]

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pt-5 z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-20 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={isToastOpened}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={classNames(
                'z-20 max-w-md w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
                toastMeta.bgColor,
                toastMeta.textColor
              )}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon
                      className={classNames('h-6 w-6', toastMeta.textColor)}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium">
                      {toast && toast.content}
                    </p>
                    <p className="mt-1 text-sm">{toast && toast.subtext}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className={classNames(
                        'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                        toastMeta.textColor
                      )}
                      onClick={() => {
                        clearToast()
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

import { useState } from 'react'
import ConnectButton from './ConnectButton'
import Image from 'next/image'

import Link from 'next/link'

export default function Navbar({
  connectWallet,
  isConnected,
  connectedAddress,
}) {
  const [navbar, setNavbar] = useState(false)

  return (
    <nav className="w-full">
      <div className="justify-center px-4 mx-auto lg:max-w-screen-2xl lg:items-center lg:flex lg:px-8">
        <div className="lg:w-1/3">
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <div className="space-y-2 lg:hidden lg:inline-block mt-8">
              <ConnectButton
                connectWallet={connectWallet}
                isConnected={isConnected}
                connectedAddress={connectedAddress}
              ></ConnectButton>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 flex items-center justify-between lg:justify-center">
          <div className="w-full lg:w-fit flex items-center justify-between lg:justify-center py-3 lg:py-5 lg:block ">
            <div className="lg:hidden float-right">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className=" w-1/3 justify-center items-center hidden space-y-8 lg:inline-block ">
          <ConnectButton
            connectWallet={connectWallet}
            isConnected={isConnected}
            connectedAddress={connectedAddress}
          ></ConnectButton>
        </div>
      </div>
    </nav>
  )
}

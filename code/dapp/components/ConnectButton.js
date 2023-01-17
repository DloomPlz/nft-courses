import useWeb3 from '../lib/wallet/wallet'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ConnectButton({
  connectWallet,
  isConnected,
  connectedAddress,
}) {
  return (
    <>
      <button
        disabled={isConnected}
        type="button"
        onClick={async () => await connectWallet()}
        className="mt-5 w-full text-center flex justify-center items-center disabled:opacity-70 inline-block w-full text-center text-white  transform duration-500 hover:scale-105 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {!isConnected ? (
          <>
            <span className="font-roboto font-bold">Connect</span>
          </>
        ) : (
          <>
            <span className="font-roboto">{connectedAddress}</span>
          </>
        )}
      </button>
    </>
  )
}

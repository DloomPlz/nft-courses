import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'

import useWeb3 from '../lib/wallet/wallet'
import MintBox from '../components/MintBox'

export default function Home(props) {
  const [web3, setWeb3] = useState({ signer: null, provider: null })

  const {
    provider,
    signer,
    chainIdUsed,
    explorerChainId,
    connectedAddress,
    connectWallet,
    isConnecting,
    isConnected,
    createSignaturePublic,
  } = useWeb3()

  return (
    <>
      <Navbar
        connectWallet={connectWallet}
        isConnected={isConnected}
        connectedAddress={connectedAddress}
      ></Navbar>
      <div className="mt-36 container mx-auto px-4 mx-auto lg:max-w-7xl lg:items-center lg:flex lg:px-8">
        <MintBox
          connectWallet={connectWallet}
          isConnected={isConnected}
          connectedAddress={connectedAddress}
          signer={signer}
          createSignaturePublic={createSignaturePublic}
        />
      </div>
    </>
  )
}

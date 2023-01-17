import { useState, useEffect, useCallback } from 'react'

import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useToast } from '../../hooks/use-toast'

import { NODES_URI } from '../../config/rpcConfig'

const useWeb3 = () => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainIdUsed, setChainIdUsed] = useState(null)
  const [explorerChainId, setExplorerChainId] = useState(null)
  const [connectedAddress, setConnectedAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const [web3Modal, setWeb3Modal] = useState(null)

  const { setToast } = useToast()

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: '26je4VhmEMGqPva1NNML5HP57rS',
          rpc: {
            1: NODES_URI.eth,
            97: NODES_URI.bscTestnet,
            56: NODES_URI.bsc,
          },
        },
      },
    }

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      disableInjectedProvider: false,
      network: 'mainnet',
      providerOptions,
      theme: 'dark',
    })

    newWeb3Modal.clearCachedProvider()

    setWeb3Modal(newWeb3Modal)
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)
    let instance
    try {
      instance = await web3Modal.connect()
      addListeners(instance)
    } catch (e) {
      console.log('Could not get a wallet connection', e)
      setIsConnecting(false)
      return
    }
    provider = new ethers.providers.Web3Provider(instance)
    setProvider(provider)

    signer = provider.getSigner()
    setSigner(signer)
    const address = await signer.getAddress()
    const chainId = await provider.getNetwork()
    setChainIdUsed(chainId)
    setConnectedAddress(address)
    setIsConnecting(false)
    setIsConnected(true)
    setToast({
      type: 'info',
      subtext: `${address} connected`,
      content: 'Successfully connected',
    })
  }

  async function addListeners(web3ModalProvider) {
    console.log('Adding listeners')
    web3ModalProvider.on('accountsChanged', async (accounts) => {
      provider = new ethers.providers.Web3Provider(web3ModalProvider)
      setProvider(provider)

      signer = provider.getSigner()
      setSigner(signer)
      const address = await signer.getAddress()
      const chainId = await provider.getNetwork()
      setChainIdUsed(chainId)
      setConnectedAddress(address)
      setIsConnecting(false)
      setIsConnected(true)
      setToast({
        type: 'info',
        subtext: `${address} connected`,
        content: 'Successfully connected',
      })
    })

    // Subscribe to chainId change
    web3ModalProvider.on('chainChanged', (chainId) => {
      setChainIdUsed(chainId)
    })
  }

  /*const createSignaturePublic = async (addr) => {
    const formattedAddress = ethers.utils.getAddress(addr)
    // Construct message to sign.
    const message = `0x000000000000000000000000${formattedAddress.substring(2)}`
    const signature = await signerPublic.signMessage(message)
    return signature
  }*/

  return {
    provider,
    signer,
    chainIdUsed,
    explorerChainId,
    connectedAddress,
    connectWallet,
    isConnecting,
    isConnected,
    //createSignaturePublic,
  }
}

export default useWeb3

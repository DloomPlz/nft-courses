import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { NFTContract } from '../contract/contract'
import { useToast } from '../hooks/use-toast'

// To change
const contractAddress = `${process.env.NEXT_PUBLIC_CONTRACT}`

// https://data-seed-prebsc-1-s3.binance.org:8545 for bsc testnet
// https://rpc.ankr.com/eth for ethereum
const node = `${process.env.NEXT_PUBLIC_NODE}`
const totalSupply = `${process.env.NEXT_PUBLIC_SUPPLY}`

// Connect to node
const provider = new ethers.providers.JsonRpcProvider(node)
const contract = new ethers.Contract(contractAddress, NFTContract.abi, provider)

export default function MintBox({
  connectWallet,
  isConnected,
  connectedAddress,
  signer,
}) {
  console.log(contractAddress)
  const { setToast } = useToast()

  const [currentStep, setCurrentStep] = useState(0)

  const [amountMinted, setAmountMinted] = useState('0')

  const [isMinting, setIsMinting] = useState(false)

  const [mintNumber, setMintNumber] = useState(1)

  const [publicPrice, setPublicPrice] = useState(`0.005`)

  const [userBalance, setUserBalance] = useState('0')

  const [mintDisabled, setMintDisabled] = useState(false)
  const [mintErrorMessage, setMintErrorMessage] = useState('')
  const [informationMessage, setInformationMessage] = useState('')
  const [maxMintAmountForUser, setMaxMintAmountForUser] = useState(10)

  useEffect(() => {
    fetchContractData().catch(console.error)

    setInterval(async () => {
      const amount = (await contract.totalSupply()).toNumber()
      const formattedAmountMinted = amount.toLocaleString('en-US')
      setAmountMinted(formattedAmountMinted)
    }, 15000)

    fetchContractData().catch(console.error)
  }, [])

  const fetchContractData = async () => {
    const step = await contract.sellingStep()
    const price = await contract.publicSalePrice()
    setCurrentStep(step)

    const publicSalePrice = ethers.utils.formatEther(price)
    setPublicPrice(publicSalePrice)

    const amountMinted = (await contract.totalSupply()).toNumber()
    const formattedAmountMinted = amountMinted.toLocaleString('en-US')
    setAmountMinted(formattedAmountMinted)
  }

  const fetchUserData = async () => {
    if (connectedAddress != '') {
      const web3addr = ethers.utils.getAddress(connectedAddress)

      const balance = await provider.getBalance(web3addr)
      const balanceInEth = parseFloat(
        ethers.utils.formatEther(balance)
      ).toFixed(4)
      setUserBalance(balanceInEth)

      const nbMintUser = (await contract.getNumberWLMinted(web3addr)).toNumber()

      if (currentStep == 1) {
        setMaxMintAmountForUser(maxAmountPerTxnPublic)
        setMintDisabled(false)
        setMintErrorMessage('')
        setInformationMessage(`Public Mint :) ${publicPrice} ETH per NFT`)
        setIsWhitelistMint(false)
        return
      } else if (currentStep == 0) {
        if (whitelists.whitelist.includes(web3addr)) {
          setInformationMessage(`You are whitelisted :)`)
        } else {
          setInformationMessage(`You are eligible for public mint :)`)
        }
      }
    }
  }

  useEffect(() => {
    fetchUserData().catch(console.error)
    fetchContractData().catch(console.error)
  }, [connectedAddress])

  function increaseMintNumber() {
    if (mintNumber + 1 > maxMintAmountForUser) {
      return
    }
    setMintNumber(mintNumber + 1)
  }

  function decreaseMintNumber() {
    if (mintNumber - 1 <= 0) {
      return
    }
    setMintNumber(mintNumber - 1)
  }

  async function mintNFTs() {
    // Call functions of contract and set infos
    if (signer) {
      const contract = new ethers.Contract(
        contractAddress,
        NFTContract.abi,
        signer
      )
      // Call funcion depending on userStatus
      switch (currentStep) {
        case 1:
          await publicMint(contract)
          break
        default:
          break
      }
    }
  }

  async function publicMint(contract) {
    setIsMinting(true)
    const web3addr = ethers.utils.getAddress(connectedAddress)

    try {
      const finalPrice = publicPrice * mintNumber
      const mint = await contract.publicSaleMint(mintNumber, {
        value: ethers.utils.parseEther(`${finalPrice}`),
      })
      await mint.wait()
    } catch (err) {
      console.error({ err })
      setToast({
        type: 'danger',
        subtext: `Error during mint`,
        content: '',
      })
      setIsMinting(false)
      return
    }

    // Call mint function
    setIsMinting(false)
    setToast({
      type: 'success',
      subtext: `Successfully minted!`,
      content: `${mintNumber} NFT(s)`,
    })
  }

  return (
    <div className="max-w-md mr-auto ml-auto text-center mb-8">
      <h2 className="text-4xl mb-6 shadowy">
        {amountMinted} /{totalSupply}
      </h2>
      <div className="flex items-center justify-items-center">
        <button
          className="btn-counter hover:bg-[#39c2cf]"
          onClick={decreaseMintNumber}
        >
          -
        </button>
        <input
          type="text"
          className="counter-value"
          value={mintNumber}
          readOnly
        ></input>
        <button
          className="btn-counter hover:bg-[#39c2cf]"
          onClick={increaseMintNumber}
        >
          +
        </button>
      </div>

      {isConnected && (currentStep == 1 || currentStep == 2) && (
        <button
          className="w-full btn-mint hover:bg-[#3a74d7] disabled:opacity-70"
          onClick={mintNFTs}
          disabled={mintDisabled}
        >
          {isMinting && (
            <div className="w-full flex items-center justify-items-center text-center">
              <svg
                className="animate-spin h-5 w-5 mt-1 mb-1 text-white block m-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {!isMinting && <span>Mint your NFT!</span>}
        </button>
      )}
      {!isConnected && (
        <button
          className="w-full btn-mint hover:bg-[#3a74d7] disabled:opacity-80 font-roboto"
          onClick={connectWallet}
        >
          Please connect your wallet
        </button>
      )}
      {isConnected && currentStep == 0 && (
        <button
          className="w-full btn-mint hover:bg-[#3a74d7] opacity-80 font-roboto"
          disabled
        >
          Mint not opened yet!
        </button>
      )}
      {mintErrorMessage != '' && (
        <p className="text-orange-700 mt-4 font-roboto">{mintErrorMessage}</p>
      )}
      {informationMessage != '' && (
        <p className="text-blue-700 mt-4 font-roboto">{informationMessage}</p>
      )}
    </div>
  )
}

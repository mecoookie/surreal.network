import {
  Web3Provider,
  Network,
  JsonRpcProvider
} from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import * as ethers from 'ethers';
import { SurrealMintPassFactory } from '../contracts/typechain';
import SurrealMintPassFactoryABI from '../contracts/artifacts/SurrealMintPassFactory.json';
import axios, { AxiosError } from 'axios';

declare let window: any;
let provider: Web3Provider;
let alchemyProvider = new JsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/YoBi2T8SqjgNZVmbqF8ddfq9zmEaIaLx'
);
const SURREAL_MINTPASS_ADDRESS = '0x18d0e051317e04ae96314c372bd35220460eec62';
const SURREAL_MINTPASS_ADDRESS_RINKEBY =
  '0xa2526f15c474935a7634ef383d478e893f7f54ac';

export interface ContractInfo {
  totalMinted: number;
  paused: boolean;
  mintPrice: number;
  mintPriceString: string;
  maxMintPerWallet: number;
  maxTokens: number;
  requiresSignature: boolean;
}

export interface UserInfo {
  numberMinted: number;
  signature: string;
}

export enum MintStatus {
  NONE,
  TX_PENDING,
  COMPLETE,
  ERROR
}

export interface ConnectionResponse {
  network: Network;
  address: string;
}

interface SignatureResponse {
  signature: string;
}

export interface ErrorResponse {
  message: string;
}

type ContractInfoFunction = () => Promise<ContractInfo>;
const getContractInfo: ContractInfoFunction = async () => {
  // Hard coded until I can create low-level getters because I forgot to add them to the contract
  // 🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️
  const contract = getContract(alchemyProvider);
  const totalMinted = (await contract.totalSupply(1)).toNumber();
  const paused = false;
  const mintPrice: BigNumber = BigNumber.from('40000000000000000');

  let mintPriceString = ethers.utils.formatEther(mintPrice);
  const contractInfo: ContractInfo = {
    totalMinted,
    paused,
    mintPrice: parseFloat(mintPriceString),
    mintPriceString,
    maxMintPerWallet: 4,
    maxTokens: 100,
    requiresSignature: true
  };
  return contractInfo;
};

const connect = async () => {
  const ethereum = window.ethereum;
  if (ethereum !== undefined) {
    const accounts: Array<string> = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    if (accounts.length > 0) {
      provider = new Web3Provider(ethereum);
      await validateNetwork();
      const network = await provider.detectNetwork();
      const address = await provider.getSigner().getAddress();

      const response: ConnectionResponse = {
        network,
        address
      };
      return response;
    }
  } else {
    throw Error(
      'No web3 support detected. Please install a wallet in a supported browser.'
    );
  }
};

const checkConnection = async () => {
  const ethereum = window.ethereum;
  if (ethereum !== undefined) {
    const accounts: Array<string> = await ethereum.request({
      method: 'eth_accounts'
    });
    if (accounts.length > 0) {
      return true;
    }
  } else {
    throw Error(
      'No web3 support detected. Please install a wallet in a supported browser.'
    );
  }
};

const validateNetwork = async () => {
  const network = await provider.detectNetwork();
  if (network.chainId !== 1 && network.chainId !== 4) {
    throw Error(
      'Your wallet is currently connected to ' +
        (network.name === 'unknown' ? 'an ' : 'the ') +
        network.name +
        ' network. Please connect to Ethereum Mainnet and refresh the page.'
    );
  }
};

const getUserInfo = async (address: string) => {
  try {
    const response = (
      await axios.post('https://api.harmonize.gg/surreal/mintpass/sign', {
        address
      })
    ).data as SignatureResponse;
    const contract = getContract();
    const numberMinted = (await contract.balanceOf(address, 1)).toNumber();

    const userInfo: UserInfo = {
      numberMinted,
      signature: response.signature
    };

    return userInfo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = (error as AxiosError).toJSON() as ErrorResponse;
      throw Error(errorMessage.message);
    } else {
      throw error;
    }
  }
};

const mint = async (
  address: string,
  amount: number,
  signature: string,
  { mintPrice, maxMintPerWallet }: ContractInfo
) => {
  if (amount > maxMintPerWallet) {
    throw Error(
      'You can only mint a maximum of ' + maxMintPerWallet + 'NFTs per wallet.'
    );
  }
  const contract = getContract();
  await validateNetwork();
  const totalEther = mintPrice * amount;
  let tx: ethers.ContractTransaction = await contract.publicMint(
    address,
    amount,
    signature,
    {
      value: ethers.utils.parseEther(`${totalEther}`)
    }
  );
  return tx.hash;
};

const listen = async (hash: string) => {
  let tx = await provider.getTransaction(hash);
  const receipt = await provider.waitForTransaction(tx.hash);
  if (receipt.status === 1) {
    return MintStatus.COMPLETE;
  } else {
    throw MintStatus.ERROR;
  }
};

const getContract = (web3Provider: JsonRpcProvider | undefined = undefined) => {
  let contractAddress = SURREAL_MINTPASS_ADDRESS;
  if (provider !== undefined && provider.network.name === 'rinkeby') {
    contractAddress = SURREAL_MINTPASS_ADDRESS_RINKEBY;
  }
  const contract = new ethers.Contract(
    contractAddress,
    SurrealMintPassFactoryABI,
    provider ? provider.getSigner() : web3Provider
  ) as SurrealMintPassFactory;
  return contract;
};

export { listen, mint, checkConnection, connect, getContractInfo, getUserInfo };

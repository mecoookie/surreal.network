import {
  Web3Provider,
  Network,
  JsonRpcProvider
} from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import * as ethers from 'ethers';
import { Surreal, SurrealMintPassFactory } from '../contracts/typechain';
import * as SurrealMintPassFactoryABI from '../contracts/artifacts/SurrealMintPassFactory.json';
import axios, { AxiosError } from 'axios';

declare let window: any;
let provider: Web3Provider;
let alchemyProvider = new JsonRpcProvider('');
const SURREAL_MINTPASS_ADDRESS = '0x18d0e051317e04ae96314c372bd35220460eec62';

export interface ContractInfo {
  totalMinted: number;
  paused: boolean;
  mintPrice: number;
  mintPriceString: string;
  maxMintPerTx: number;
  maxTokens: number;
  requiresSignature: boolean;
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

export interface SignatureResponse {
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
    maxMintPerTx: 4,
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
  if (network.chainId !== 1) {
    throw Error(
      'Your wallet is currently connected to ' +
        (network.name === 'unknown' ? 'an ' : 'the ') +
        network.name +
        ' network. Please connect to Ethereum Mainnet and refresh the page.'
    );
  }
};

const getSignature = async (address: string) => {
  try {
    const response = (
      await axios.get('https://defer.finance/address/' + address)
    ).data as SignatureResponse;
    return response;
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
  { mintPrice, maxMintPerTx }: ContractInfo
) => {
  if (amount > maxMintPerTx) {
    throw Error(
      'You can only mint a maximum of ' + maxMintPerTx + 'NFTs per transaction.'
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
  const contract = new ethers.Contract(
    SURREAL_MINTPASS_ADDRESS,
    SurrealMintPassFactoryABI,
    provider ? provider.getSigner() : web3Provider
  ) as SurrealMintPassFactory;
  return contract;
};

export { listen, mint, checkConnection, connect, getContractInfo };

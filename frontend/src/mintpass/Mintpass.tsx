import React, { useEffect, useState } from "react";
import {
  checkConnection,
  connect,
  ConnectionResponse,
  ContractInfo,
  getContractInfo,
  MintStatus,
} from "../services/wallet";
import mintpass from "./../videos/mintpass.mp4";

interface Props {}

const Mintpass = (props: Props) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [connection, setConnection] = useState<ConnectionResponse | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [mintStatus, setMintStatus] = useState<MintStatus>(MintStatus.NONE);
  const [contractInfo, setContractInfo] = useState<ContractInfo | undefined>();
  const [mintTx, setMintTx] = useState<string | undefined>();

  useEffect(() => {
    const dispatchGetContract = async () => {
      try {
        const newContractInfo: ContractInfo = await getContractInfo();
        setContractInfo(newContractInfo);
        console.log(newContractInfo);
        const connected = await checkConnection();
        if (connected) {
          connectWalletPressed();
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };
    dispatchGetContract();
  }, []);

  const connectWalletPressed = () => {
    const dispatchWalletConnect = async () => {
      try {
        const response = await connect();
        setConnection(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };
    dispatchWalletConnect();
  };

  const mintPressed = () => {};

  return (
    <div className="bg-gray-800 mt-8" id="Mint Pass">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Mint Pass #1
          </h2>
          <div className="mt-4 text-xl text-gray-400">
            <div className="flex flex-col gap-2">
              <p className="text-2xl text-emerald-500">
                {contractInfo?.totalMinted ?? 0}/100 Minted
              </p>
              <p className="text-2xl text-emerald-500">
                {contractInfo?.mintPriceString}Ξ
              </p>
              <p className="text-lg">Max 4 per wallet</p>
              <p className="text-lg">MAYC/BAYC Exclusive</p>
            </div>
            <div className="mt-4 max-w-sm">
              <button
                onClick={
                  connection?.address ? mintPressed : connectWalletPressed
                }
              >
                <div className="hover:bg-emerald-400 text-white bg-emerald-600 text-xs bg-secondary text-contrast py-3 px-6 w-52 rounded-lg shadow-sm text-center">
                  <h1 className="text-lg font-bold">
                    {connection?.address ? "Mint" : "Connect Wallet"}
                  </h1>
                </div>
              </button>
            </div>
            <div className="max-w-sm">
              <a
                href="https://etherscan.io/address/0x18d0e051317e04ae96314c372bd35220460eec62"
                target="_blank"
              >
                <div className="hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center mt-16">
                  <p>ERC1155 Verified Smart Contract</p>
                  <p className="text-blue-400 font-bold">
                    0x18d0e051...220460eec62
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full max-w-xs">
          <div className="mt-1.5 relative">
            <video src={mintpass} autoPlay muted loop></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mintpass;

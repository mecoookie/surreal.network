import React from "react";
import mintpass from "./../videos/mintpass.mp4";

interface Props {}

const Mintpass = (props: Props) => {
  return (
    <div className="bg-gray-800 mt-8" id="Mint Pass">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Mint Pass #1
          </h2>
          <div className="mt-7 text-xl text-gray-400">
            <div className="flex flex-col gap-4">
              <p className="text-2xl text-emerald-500">99/100 available</p>
              <p className="text-2xl text-emerald-500">0.04Ξ</p>
              <p className="text-lg">Max 4 per wallet</p>
              <p className="text-lg">MAYC/BAYC Exclusive</p>
              <p className="text-4xl text-emerald-500 font-bold">
                Minting 12/17 7:00 PM Central (1:00 AM UTC)
              </p>
            </div>
            <div className="mt-6 max-w-sm">
              <a
                href="https://etherscan.io/address/0x18d0e051317e04ae96314c372bd35220460eec62"
                target="_blank"
              >
                <div className="hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center">
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

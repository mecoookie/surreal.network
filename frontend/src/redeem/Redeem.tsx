import apes from "./../images/apes.gif";

interface Props {}

const Redeem = (props: Props) => {
  return (
    <div className="bg-gray-800 mt-8" id="Redeem">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <div className="mt-1.5 relative">
            <img src={apes} />
          </div>
        </div>
        <div className="mt-1 w-full max-w-xs">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            SURREAL APES
          </h2>
          <div className="text-xl text-gray-400">
            <div className="mt-8 flex flex-col gap-4">
              <div>Burn your Mint Pass</div>
              <div>Choose your BAYC/MAYC</div>
              <div>Redeem matching SURREAL APE</div>
            </div>
            <div className="mt-8 text-2xl font-bold">Redeeming Soon</div>
            <a
              href="https://etherscan.io/address/0xbc4aee331e970f6e7a5e91f7b911bdbfdf928a98"
              target="_blank"
            >
              <div className="mt-8 hover:bg-gray-600 text-blue-400 bg-gray-700 text-xs bg-secondary text-contrast py-3 px-1 rounded-lg shadow-sm text-center">
                <p>ERC721 Verified Smart Contract</p>
                <p className="text-blue-400 font-bold">
                  0xbc4aee33...dbfdf928a98
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redeem;

import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'solidity-coverage';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { exit } from 'process';

dotenv.config();

const frontendContractRoot = './frontend/src/contracts/';

task('verifyContract', async (taskArgs, hre) => {
  await hre.run('verify:verify', {
    address: '0x18d0E051317E04Ae96314C372Bd35220460eEc62',
    constructorArguments: [
      '0x6560c8dF05a0823FAaEBF40E52Adcad1e8A5371A', //signer
      '0x37C6E1D755112213d5E7D5e2Aca2b83192f7cF35', //admin
      '0x5Fea9DAcdE1fb43E87b8a9259Aebc937D995F51b', //dev
      '0xBC4AEE331E970f6E7A5e91f7B911BdBFdF928A98', //surreal contract
      [
        '0x37C6E1D755112213d5E7D5e2Aca2b83192f7cF35',
        '0xfAd0feC24047f510D110fB03b73e57a72e91f33D'
      ],
      [75, 25]
    ]
  });
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10
      }
    }
  },
  networks: {
    mainnet: {
      chainId: 1,
      timeout: 120000,
      gasMultiplier: 1,
      gasPrice: 70000000000,
      loggingEnabled: true,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC ?? ''
      },
      url: process.env.MAINNET_URL ?? ''
    },
    rinkeby: {
      chainId: 4,
      timeout: 120000,
      gasMultiplier: 1,
      gasPrice: 1000000000,
      loggingEnabled: true,
      accounts: {
        mnemonic: process.env.RINKEBY_MNEMONIC ?? ''
      },
      url: process.env.RINKEBY_URL ?? ''
    },
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      forking: {
        url: process.env.MAINNET_URL ?? ''
      },
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      mining: {
        auto: true
      }
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  abiExporter: {
    path: frontendContractRoot + 'artifacts',
    flat: true
  },
  typechain: {
    outDir: frontendContractRoot + 'typechain'
  }
};

export default config;

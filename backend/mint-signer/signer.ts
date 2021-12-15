import { APIGatewayEvent } from 'aws-lambda';
import BAYC from './BAYC.json';
import { Contract, Wallet } from 'ethers';
import { sanitizedAddress } from './sanitize';
import { JsonRpcProvider } from '@ethersproject/providers';

const signingWallet: Wallet = Wallet.fromMnemonic(process.env.MNEMONIC ?? '');

const BAYC_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

const web3Provider = new JsonRpcProvider(process.env.ALCHEMY, 'homestead');

const generateSignature = async (addressString: string) => {
  return await signingWallet.signMessage(sanitizedAddress(addressString));
};

interface SignatureRequest {
  // Since the contract expects msg.sender as the signed message, we don't need to ask
  // the minter to sign locally before checking for apes.
  address: string;
}

const verifyAddress = async (address: string) => {
  const contract = new Contract(BAYC_ADDRESS, BAYC, web3Provider);
  return (await contract.balanceOf(address)) > 0;
};

const unauthorizedMessage = 'You must have a BAYC to mint';

const handler = async (event: APIGatewayEvent) => {
  if (!event.body) {
    return {
      statusCode: 400
    };
  }

  try {
    const request: SignatureRequest = JSON.parse(event.body);

    if (!(await verifyAddress(request.address))) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: unauthorizedMessage
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
    }

    const signature = await generateSignature(
      sanitizedAddress(request.address)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        signature
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went terribly wrong'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }
};

module.exports = {
  handler
};

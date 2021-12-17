import { APIGatewayEvent } from 'aws-lambda';
import BAYC from './BAYC.json';
import MAYC from './MAYC.json';
import { Contract, Wallet } from 'ethers';
import { sanitizedAddress } from './sanitize';
import { JsonRpcProvider } from '@ethersproject/providers';

const signingWallet: Wallet = Wallet.fromMnemonic(process.env.MNEMONIC ?? '');

const BAYC_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
const MAYC_ADDRESS = '0x60e4d786628fea6478f785a6d7e704777c86a7c6';

const web3Provider = new JsonRpcProvider(process.env.ALCHEMY, {
  name: 'mainnet',
  chainId: 1
});

const generateSignature = async (addressString: string) => {
  return await signingWallet.signMessage(sanitizedAddress(addressString));
};

interface SignatureRequest {
  // Since the contract expects msg.sender as the signed message, we don't need to ask
  // the minter to sign locally before checking for apes.
  address: string;
}

const verifyAddress = async (address: string) => {
  const bayc = new Contract(BAYC_ADDRESS, BAYC, web3Provider);
  const mayc = new Contract(MAYC_ADDRESS, MAYC, web3Provider);
  return (
    (await bayc.balanceOf(address)) > 0 || (await mayc.balanceOf(address)) > 0
  );
};

const unauthorizedMessage = 'You must have a BAYC or MAYC to mint';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};

const handler = async (event: APIGatewayEvent) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers
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
        headers
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
      headers
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went terribly wrong'
      }),
      headers
    };
  }
};

module.exports = {
  handler
};

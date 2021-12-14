# Surreal Apes web3

A GANS generative art project  
Open-sourced for transparency

## Core Components

---

`Surreal.sol`

```solidity
contract Surreal is
    AccessControlEnumerable,
    ERC721URIStorage,
    ERC721Enumerable,
    PaymentSplitter,
    Pausable,
    ReentrancyGuard,
    SignedMinting
```

`SurrealMintPassFactory.sol`

```solidity
contract SurrealMintPassFactory is
  ERC1155,
  ERC1155Supply,
  AccessControlEnumerable,
  PaymentSplitter,
  SignedMinting,
  ReentrancyGuard
{
  struct MintPass {
    uint256 mintPrice;
    uint256 passMintLimit;
    uint256 walletMintLimit;
    uint256 totalMinted;
    string tokenURI;
    bool requiresSignature;
    bool saleActive;
    uint256 numberMinted;
    mapping(address => uint256) mintsPerAddress;
  }
}

```

`SignedMinting.sol`

```solidity
contract SignedMinting {
  address public signer;

  constructor(address _signer);

  function _setMintingSigner(address _signer) internal;

  function validateSignature(bytes memory signature)
    internal
    view
    returns (bool);

  function recoveredAddress(bytes memory signature);

  function asciiSender() public view returns (string memory);
}

```

## Basic Mechanisms

---

### AccessControlEnumerable

#### `DEFAULT_ADMIN_ROLE`

Can perform any `authorized` action. Similar to an `owner()` in `Ownable`, but with the added ability to grant roles to other contracts and EOAs.

#### `INTEGRATION_ROLE`

Integration contracts used to automate authorized processes such as minting, revealing, etc. Authorized to use internal mint functions on `Surreal` and `SurrealMintPassFactory` to allow flexibility toward future functionality / contracts.

### SignedMinting.sol

---

ECDSA based signature verification contract. Used to create arbitrary minting restrictions.

#### High Level Overview

1. The `Surreal` or `SurrealMintPassFactory` contract is set to require signature.
2. A known `signer` address is set on the contract state. That signer's private keys are managed by a backend implementation (usually serverless).
3. Prior to creating a `publicMint` or `claim` transaction, the frontend asks the backend to sign the minter's address using the `signer` keys.
4. The backend applies any restrictions or requirements prior to signing ("must own BAYC/MAYC", "Is on a whitelist"). These can be modified arbitrarily per token requirement.
5. The signature is passed back to the frontend and included in the `publicMint` or `claim` transaction call made by the user on the frontend.
6. `SignedMinting` receives the `signature` and attempts to recover the signers address. `signature` payload is expected to be the eth address of `msg.sender`.
7. If `SignedMinting` recovers our `signer`'s address, it is assumed to be signed by us and authorized for mint.

Thus any backend controller by surreal.network has the ability to first confirm that a wallet can maint a Mint-pass or redeem a Surreal.

**Important**  
When creating new restrictions/requiremets for signing, update the signature on contract using `_setMintingSigner`. If not updated: old signatures (prior restrictions) will still be valid.

## To do

---

- [ ] Add serverless backend for known-signer verification
- [ ] Connect mint pass contract to frontend for minting
- [ ] Add redemption+burn to frontend
- [ ] Create token-gated dashboard access for managing mint-passes and revealing SURREAL tokens

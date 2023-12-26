/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestFakeWalletToken,
  TestFakeWalletTokenInterface,
} from "../../../../contracts/tests/cross_sender_state/TestFakeWalletToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ep",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "anotherWallet",
    outputs: [
      {
        internalType: "contract TestFakeWalletToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract TestFakeWalletToken",
        name: "_anotherWallet",
        type: "address",
      },
    ],
    name: "sudoSetAnotherWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "sudoSetBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "validateUserOp",
    outputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260405161047738038061047783398101604081905261002291610047565b600280546001600160a01b0319166001600160a01b0392909216919091179055610077565b60006020828403121561005957600080fd5b81516001600160a01b038116811461007057600080fd5b9392505050565b6103f1806100866000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80631574d98a146100595780631593481a146100895780632d2299bc146100b35780633a871cdd146100e357806370a0823114610104575b005b60015461006c906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b610057610097366004610251565b6001600160a01b03909116600090815260208190526040902055565b6100576100c136600461027d565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6100f66100f13660046102a1565b61012d565b604051908152602001610080565b6100f661011236600461027d565b6001600160a01b031660009081526020819052604090205490565b600061013c60608501856102f5565b905060140361018457600061015460608601866102f5565b61016391601491600091610343565b61016c9161036d565b60601c6000908152602081905260408120555061022f565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156101cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f191906103a2565b1161022f5760405162461bcd60e51b815260206004820152600a6024820152696e6f2062616c616e636560b01b604482015260640160405180910390fd5b5060009392505050565b6001600160a01b038116811461024e57600080fd5b50565b6000806040838503121561026457600080fd5b823561026f81610239565b946020939093013593505050565b60006020828403121561028f57600080fd5b813561029a81610239565b9392505050565b6000806000606084860312156102b657600080fd5b833567ffffffffffffffff8111156102cd57600080fd5b840161016081870312156102e057600080fd5b95602085013595506040909401359392505050565b6000808335601e1984360301811261030c57600080fd5b83018035915067ffffffffffffffff82111561032757600080fd5b60200191503681900382131561033c57600080fd5b9250929050565b6000808585111561035357600080fd5b8386111561036057600080fd5b5050820193919092039150565b6bffffffffffffffffffffffff19813581811691601485101561039a5780818660140360031b1b83161692505b505092915050565b6000602082840312156103b457600080fd5b505191905056fea2646970667358221220a808a61dc88b5c6048f4a4c07f82f92a39666f7204b83c86d0b78ffa33493d3964736f6c634300080f0033";

type TestFakeWalletTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestFakeWalletTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestFakeWalletToken__factory extends ContractFactory {
  constructor(...args: TestFakeWalletTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ep: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<TestFakeWalletToken> {
    return super.deploy(_ep, overrides || {}) as Promise<TestFakeWalletToken>;
  }
  override getDeployTransaction(
    _ep: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_ep, overrides || {});
  }
  override attach(address: string): TestFakeWalletToken {
    return super.attach(address) as TestFakeWalletToken;
  }
  override connect(signer: Signer): TestFakeWalletToken__factory {
    return super.connect(signer) as TestFakeWalletToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestFakeWalletTokenInterface {
    return new utils.Interface(_abi) as TestFakeWalletTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestFakeWalletToken {
    return new Contract(address, _abi, signerOrProvider) as TestFakeWalletToken;
  }
}
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Buffer } from "npm:buffer";
import { ethers } from "npm:ethers@5.7.2";
import JsonRpc, { ErrorObject, JsonRpcError } from "npm:jsonrpc-lite";
import { ServiceBroker } from "npm:moleculer";
import HTTPServer from "npm:moleculer-web";

import type { IUserOperation } from "npm:userop";

console.log("RPC", Deno.env.get("RPC"));

const provider = new ethers.providers.StaticJsonRpcProvider(
  Deno.env.get("RPC")
);
const signer = new ethers.Wallet(Deno.env.get("PAYMASTER_PK"));
const broker = new ServiceBroker();

broker.createService({
  name: "gateway",
  mixins: [HTTPServer],

  settings: {
    port: 4339,
    routes: [
      {
        aliases: {
          "POST /paymaster": "paymaster.gateway",
        },
        cors: {
          origin: "*",
        },
        bodyParsers: {
          json: true,
          urlencoded: { extended: true },
        },
      },
    ],
  },
});

// Define a service
broker.createService({
  name: "paymaster",
  hooks: {
    before: {
      "*": function (ctx) {
        this.logger.info(
          `Paymaster called with '${ctx.action?.name}' action`,
          ctx
        );
      },
    },
    after: {
      "*": (ctx, res) => {
        return JsonRpc.success(ctx.params.id, res);
      },
    },

    error: {
      "*": function (ctx, err) {
        let jsonRpcError: ErrorObject | undefined;
        if ("body" in err) {
          const { body } = err;
          const parsedErr = JsonRpc.parse(body?.toString() || "");

          if (Array.isArray(parsedErr) || parsedErr.type !== "error") {
            throw err;
          }
          jsonRpcError = parsedErr.payload;
        }

        this.logger.error(
          `Error occurred when '${ctx.action?.name}' action was called`,
          jsonRpcError || err
        );
        throw JsonRpc.error(
          ctx.params.id,
          new JsonRpcError(
            jsonRpcError?.error.message ?? err.message,
            jsonRpcError?.error?.code ?? 500
          )
        );
      },
    },
  },
  actions: {
    gateway(ctx) {
      const { method, params, id } = ctx.params;
      const paymasterMethodsNames = Object.keys(this.schema.methods);

      return paymasterMethodsNames.includes(method)
        ? this[method](...params)
        : this._proxy(method, id, params);
    },
  },
  methods: {
    async pm_sponsorUserOperation(userOp: IUserOperation) {
      const latestBlock = await provider.getBlock("latest");
      const { chainId } = await provider.getNetwork();
      const verifiableUserOpPacked = ethers.utils.defaultAbiCoder.encode(
        ["address", "uint256", "bytes32", "bytes32", "uint256", "uint256"],
        [
          userOp.sender,
          userOp.nonce,
          ethers.utils.keccak256(
            Buffer.from(userOp.initCode.toString().slice(2), "hex")
          ),
          ethers.utils.keccak256(
            Buffer.from(userOp.callData.toString().slice(2), "hex")
          ),
          userOp.maxFeePerGas,
          userOp.maxPriorityFeePerGas,
        ]
      );

      console.log("-------------------------------------------");
      console.log("sender", userOp.sender);
      console.log("nonce", userOp.nonce);
      console.log(
        "hashInitCode",
        ethers.utils.keccak256(
          Buffer.from(userOp.initCode.toString().slice(2), "hex")
        )
      );
      console.log(
        "hashCallData",
        ethers.utils.keccak256(
          Buffer.from(userOp.callData.toString().slice(2), "hex")
        )
      );
      console.log(
        "maxFeePerGas",
        ethers.BigNumber.from(userOp.maxFeePerGas).toString()
      );
      console.log(
        "maxPriorityFeePerGas",
        ethers.BigNumber.from(userOp.maxPriorityFeePerGas).toString()
      );
      console.log("-------------------------------------------");

      console.log("verifiableUserOpPacked", verifiableUserOpPacked);
      const verifiableUserOpHash = ethers.utils.keccak256(
        verifiableUserOpPacked
      );
      console.log("verifiableUserOpHash", verifiableUserOpHash);
      const signature = await signer.signMessage(
        Buffer.from(verifiableUserOpHash.slice(2), "hex")
      );
      const validFrom = latestBlock.timestamp;
      const validUntil = latestBlock.timestamp + 10 * 60;
      console.log(
        `valid from ${new Date(validFrom * 1000).toLocaleString(
          "fr-FR"
        )} until ${new Date(validUntil * 1000).toLocaleString("fr-FR")}`,
        { validFrom, validUntil }
      );

      return (
        Deno.env.get("PAYMASTER_CONTRACT") +
        ethers.utils.defaultAbiCoder
          .encode(
            ["bytes", "uint48", "uint48", "uint256", "bytes"],
            [verifiableUserOpHash, validFrom, validUntil, chainId, signature]
          )
          .slice(2)
      );
    },

    async _proxy(method, id, params) {
      return provider.send(method, params);
    },
  },
});

broker.start();

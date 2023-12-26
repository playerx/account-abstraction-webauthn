# Account Abstraction + WebAuthn

This is a research project to use [WebAuthn](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) (FaceID/Fingerprint Authentication) with [Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337) (ERC 4337)

## Goals

- Simplify user onboarding flow for blockchain projects
- Make blockchain accessible to millions of new users, with no friction

## Vision

Installing a chrome extension, or a mobile app to use a wallet is a big blocker for user onboarding. Instead, we should use modern standards like WebAuthn and Account Abstraction to onboard users by using their FaceID/Fingerprint, without installing any additional app or extension. Software engineers should have a SDK, which can be integrated into any website in a few lines of code and use this new way of user onboarding/authentication.

## Idea / How it works

1. User will generate a private key on their device by using a WebAuthn standard.
2. Smart Wallet (ERC-4337 Account) will be created for the user on-chain and the public key will be included as a signer.
3. Every time users will need to do a userOp on-chain, they will do the webauthn verification (FaceID/Fingerprint/etc.) and send the signature on-chian for verification. The signature will include the hash of this userOp.

For the example of the UX, please check the `Live Demo` of this project:
https://ethglobal.com/showcase/avatar-protocol-z6md2

## Important Facts

- WebAuthn is a web standard and it's already available in every major browser. I'd highlight Safari on iOS and Chrome on Android. Also on desktop browsers.
- To use WebAuthn you don't need an approval from authorities like Apple, Google, etc. Every web app can use it today.
- Users don't need to download or install anything, WebAuthn is already there, in the device.
- There is no way to export a private key from the device (generated by WebAuthn). All you can do is Unlock the private key by using your Fingerprint/FaceID and do the signature.
- You can only access a private key for your domain. Cross-domain access isn't allowed by the standard.
- It's possible to use the same private key across domains and devices. You will need [YubiKey](https://www.yubico.com/ge/product/yubikey-5-series/yubikey-5-nfc/) for it.

## References

There are few projects which were an inspiration for starting this project. If you plan to work on the codebase here, I'd highly recommend checking them:

- https://github.com/zkwebauthn/webauthn-halo2
- https://github.com/qd-qd/wallet-abstraction

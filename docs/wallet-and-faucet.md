# Wallet and Faucet Notes

## Arc Testnet network settings

- Network name: Arc Testnet
- RPC URL: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Currency symbol: `USDC`
- Explorer: `https://testnet.arcscan.app`

## Safe wallet policy

Use a dedicated testnet wallet only. Do not reuse a main wallet, seed phrase, or private key.

## Faucet flow to test

1. Create or import a dedicated testnet wallet.
2. Add Arc Testnet.
3. Visit Circle Faucet: `https://faucet.circle.com`.
4. Select Arc Testnet and request testnet USDC.
5. Record whether the wallet balance and explorer update clearly.

## Feedback to capture

- Did wallet network setup show USDC as gas clearly?
- Did the faucet request have confusing limits or errors?
- How long did testnet USDC take to arrive?
- Did explorer links make the transfer easy to verify?

## Current wallet status

A dedicated Arc testnet wallet has been generated for this project. The private key is stored outside the repo and must never be committed.

Faucet attempt note: automated faucet submission reached Circle's reCAPTCHA check, so final funding requires human verification in a browser. This is expected and should not be bypassed.

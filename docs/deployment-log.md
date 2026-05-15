# Deployment Log

Use this file to record real Arc public testnet actions.

## Current testnet wallet

- Purpose: dedicated Arc public testnet deployment wallet
- Address: `0x3B07bbd09Daeac0852CB77A7e01a0957Ae6e192C`
- Private key: stored outside this repo under the local project secrets directory; never commit it
- Faucet: funded with 20 testnet USDC/native value from Circle Faucet
- Latest post-deploy balance: ~19.976399600039 USDC/native value

## 2026-05-15 — Arc Testnet deployments

### HelloArchitect

- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Tooling: Foundry `forge 1.7.1`
- Contract: `HelloArchitect`
- Deployer wallet: `0x3B07bbd09Daeac0852CB77A7e01a0957Ae6e192C`
- Contract address: `0x44e2e0926e1c7b3207f6b97727ab829170bae22d`
- Tx hash: `0x6e886f552c1582b1d0cb87c33f262583bc32d917fae69386be660c78f5a372d0`
- Explorer transaction: `https://testnet.arcscan.app/tx/0x6e886f552c1582b1d0cb87c33f262583bc32d917fae69386be660c78f5a372d0`
- Explorer contract: `https://testnet.arcscan.app/address/0x44e2e0926e1c7b3207f6b97727ab829170bae22d`
- Verification call: `getGreeting()` returned `Hello Architect!`

### AgentTaskEscrow

- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Tooling: Foundry `forge 1.7.1`
- Contract: `AgentTaskEscrow`
- Deployer wallet: `0x3B07bbd09Daeac0852CB77A7e01a0957Ae6e192C`
- Contract address: `0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`
- Tx hash: `0xac46a132cc25f1a384284b44ea6a0a26a3cb2c95e4150f65479dd6614526f8eb`
- Explorer transaction: `https://testnet.arcscan.app/tx/0xac46a132cc25f1a384284b44ea6a0a26a3cb2c95e4150f65479dd6614526f8eb`
- Explorer contract: `https://testnet.arcscan.app/address/0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`
- Verification call: `nextTaskId()` returned `1`

## Notes

What worked:
- Circle Faucet funded the dedicated Arc testnet wallet.
- Foundry deployment worked against Arc RPC.
- Both contracts are callable through `cast` after deployment.

Potential friction:
- Circle Faucet may require human reCAPTCHA verification.
- Wallets may display Arc native USDC with generic EVM token wording depending on wallet support.

Suggested improvement:
- Arc onboarding docs could explicitly show a deployer flow using a dedicated testnet wallet and a small post-deploy `cast call` verification.

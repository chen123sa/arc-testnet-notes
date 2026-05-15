# Field Report — First Arc Testnet Builder Run

Date: 2026-05-15

## Summary

This report records the first complete builder pass for this repo: wallet funding, Foundry setup, contract tests, Arc testnet deployments, and post-deploy verification calls.

## Environment

- OS: Linux
- Node.js: 22.x
- Foundry: forge 1.7.1
- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Explorer: `https://testnet.arcscan.app`
- Faucet: `https://faucet.circle.com`

## Contracts deployed

### HelloArchitect

- Contract: `0x44e2e0926e1c7b3207f6b97727ab829170bae22d`
- Tx: `0x6e886f552c1582b1d0cb87c33f262583bc32d917fae69386be660c78f5a372d0`
- Explorer: <https://testnet.arcscan.app/address/0x44e2e0926e1c7b3207f6b97727ab829170bae22d>
- Verification: `getGreeting()` returned `Hello Architect!`

### AgentTaskEscrow

- Contract: `0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`
- Tx: `0xac46a132cc25f1a384284b44ea6a0a26a3cb2c95e4150f65479dd6614526f8eb`
- Explorer: <https://testnet.arcscan.app/address/0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b>
- Verification: `nextTaskId()` returned `1`

## Test results

```text
forge test --summary
AgentTaskEscrowTest: 5 passed, 0 failed
HelloArchitectTest: 3 passed, 0 failed
Total: 8 passed, 0 failed

npm run check
validation passed
Node tests: 4 passed, 0 failed
```

## What worked well

- Arc RPC responded with the expected chain ID: `5042002`.
- Foundry deployment worked with standard EVM tooling.
- Contracts were callable immediately after deployment.
- Faucet-funded native USDC was enough for both deployments with minimal cost.
- Explorer links resolved cleanly for deployed contracts and transactions.

## Friction / notes

- The public Circle Faucet may trigger reCAPTCHA or unusual-traffic checks. This is expected and should be completed manually rather than bypassed.
- Wallets and EVM tooling can make native USDC feel like a standard gas token; new builders may need a clear note that Arc uses USDC as native gas/value on testnet.
- For first-time builders, it helps to record both a deployment transaction and a simple `cast call` verification in the same log.

## Suggested documentation improvement

A compact official “first deploy proof checklist” could help new builders:

1. Add Arc Testnet.
2. Fund a dedicated testnet wallet.
3. Run `forge test`.
4. Deploy a minimal contract.
5. Verify with one `cast call`.
6. Save tx hash, contract address, and explorer links.

## Next steps

- Add a basic interaction script for `AgentTaskEscrow`.
- Record one funded task and release/refund flow on Arc testnet.
- Connect the static demo to deployed contract addresses.

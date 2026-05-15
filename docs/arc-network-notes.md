# Arc Network Notes

## Current understanding

Arc is a public testnet Layer 1 focused on programmable money and real-world financial flows. The developer angle I am tracking:

- USDC is used as the native gas token.
- Arc is EVM-compatible, so common Solidity tooling should work.
- The public RPC is `https://rpc.testnet.arc.network`.
- The chain ID is `5042002`.
- The explorer is `https://testnet.arcscan.app`.
- Deterministic finality is useful for payment and settlement UX.
- Agentic economy docs mention ERC-8004 identity/reputation and ERC-8183 job settlement patterns.

## Builder questions to test

- How smooth is first wallet setup and faucet funding?
- Are RPC, explorer, and contract deployment docs easy to follow?
- What errors does a new builder hit first?
- How clear are USDC gas assumptions in actual tooling?
- Where could AI-agent payment workflows fit naturally?

## Project direction

Start with a small, verifiable builder footprint:

1. Minimal contract deployment with Foundry.
2. Structured deployment log and friction notes.
3. Small demo that models agent task settlement.
4. Later: connect demo state to real Arc testnet tx hashes.

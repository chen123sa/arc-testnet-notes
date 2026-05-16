# Hackathon Submission Draft

Challenge: The Stablecoins Commerce Stack Challenge  
Target track: Best Agentic Economy Experience on Arc

## Project title

AgentTaskEscrow on Arc

## Short description

AgentTaskEscrow is a public testnet prototype for AI-agent task settlement on Arc. It demonstrates how a requester can fund an agent task, how an AI-agent worker can submit a deliverable reference, and how payment can be released or refunded through an explorer-verifiable onchain workflow.

The project focuses on the agentic economy: autonomous software agents coordinating work, producing deliverables, and settling value through predictable onchain rails.

## Why this fits the track

The Agentic Economy track asks for autonomous economic experiences where AI agents can research, negotiate, or execute transactions on behalf of users or businesses using onchain rails and programmable payment logic.

This project contributes a small but concrete version of that idea:

1. A requester creates and funds a task.
2. An AI-agent worker accepts the task offchain and submits a deliverable URI onchain.
3. The requester releases payment after checking the deliverable.
4. The final state is verifiable on Arc testnet through contract reads, events, and explorer links.

## Circle / Arc products and concepts used

Confirmed in this prototype:

- Arc public testnet
- Arc RPC and explorer
- USDC-native Arc testnet environment
- Solidity smart contracts
- Foundry tests and deployment scripts
- Static demo UI
- JavaScript settlement simulator

Relevant Circle products and concepts for the next iteration:

- USDC as the settlement unit
- Circle Wallets for controlled agent/requester wallet UX
- Circle Gateway for treasury and payment routing concepts
- Nanopayments for future high-frequency agent-to-service payments

This version does not claim access to enterprise-only tools such as USYC or StableFX.

## Current MVP status

Implemented:

- `contracts/AgentTaskEscrow.sol` — task funding, deliverable submission, release, refund
- `src/settlement-simulator.mjs` — offchain quote / payment request / settlement state model
- `web/` — static browser demo for the agent settlement workflow
- Foundry tests for contracts
- Node tests for the settlement simulator
- Arc testnet deployment and interaction proof

Deployed on Arc testnet:

- `HelloArchitect`: `0x44e2e0926e1c7b3207f6b97727ab829170bae22d`
- `AgentTaskEscrow`: `0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`

## Repository

<https://github.com/chen123sa/arc-testnet-notes>

## Demo URL

Current demo is a static app under `web/`. It can be served from the repository root by any static file server.

Recommended local preview:

```bash
python3 -m http.server 8080
# open http://localhost:8080/web/
```

A hosted demo URL should be added before final submission.

## Setup and validation

```bash
npm install
npm run check
forge test
```

## Submission gaps before final entry

- Host the static demo and add the public URL.
- Add a short demo video.
- Add screenshots or a GIF walkthrough.
- Optionally wire the static demo to deployed contract reads.
- Confirm the Circle Developer Account email to use.

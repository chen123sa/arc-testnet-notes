# Arc Testnet Notes

Hands-on Arc public testnet project for contract deployment notes, structured builder feedback, and a lightweight AI-agent settlement workflow demo.

## What this repo contains

- A minimal Solidity contract for first Arc deployment: [`contracts/HelloArchitect.sol`](contracts/HelloArchitect.sol)
- A more substantial AI-agent escrow contract: [`contracts/AgentTaskEscrow.sol`](contracts/AgentTaskEscrow.sol)
- Foundry config, tests, and deployment scripts
- A small JavaScript model for task quote → USDC payment request → settlement record
- A static browser demo for the AI-agent settlement flow
- Wallet/faucet/deployment notes for reproducible Arc testnet feedback

## Why Arc

Arc uses USDC as gas and is designed for fast, deterministic settlement. That makes it interesting for stablecoin-native applications and agentic economy workflows where software agents coordinate work and settle value onchain.

## Project map

```text
contracts/HelloArchitect.sol       Minimal first-deployment contract
contracts/AgentTaskEscrow.sol      AI-agent task escrow contract
test/*.t.sol                       Foundry unit tests
script/*.s.sol                     Foundry deployment scripts
src/settlement-simulator.mjs       AI-agent settlement state model
tests/*.test.mjs                   Node tests for the settlement model
web/                               Static demo UI
docs/                              Wallet, faucet, deployment, and Discord notes
examples/                          Example task/payment JSON
```

## Quickstart: local JS demo validation

```bash
npm install
npm run check
```

The JS demo has no runtime dependencies beyond Node.js. It validates the repo structure and tests the settlement model.

## Quickstart: Foundry contract flow

Install Foundry first: <https://getfoundry.sh/>

Bootstrap the Solidity test dependency:

```bash
forge install foundry-rs/forge-std
```

Then run:

```bash
forge test
forge build
```

To deploy on Arc public testnet, create a dedicated testnet wallet, fund it with testnet USDC from the Circle Faucet, then set environment variables:

```bash
cp .env.example .env
# edit .env with a dedicated testnet private key only
source .env
forge script script/DeployHelloArchitect.s.sol:DeployHelloArchitect \
  --rpc-url "$ARC_TESTNET_RPC_URL" \
  --broadcast
```

You can also use the helper script:

```bash
./scripts/deploy-hello-architect.sh
```

To run the `AgentTaskEscrow` demo interaction after deployment:

```bash
export AGENT_TASK_ESCROW_ADDRESS=0x...
export REQUESTER_PRIVATE_KEY=0x...     # dedicated testnet requester only
export WORKER_PRIVATE_KEY=0x...        # dedicated testnet worker only
export AGENT_TASK_BUDGET_WEI=10000000000000000
forge script script/InteractAgentTaskEscrow.s.sol:InteractAgentTaskEscrow \
  --rpc-url "$ARC_TESTNET_RPC_URL" \
  --broadcast
```

Never use a real/mainnet private key.

## Arc Testnet network details

- RPC URL: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Gas token: `USDC`
- Explorer: `https://testnet.arcscan.app`
- Faucet: `https://faucet.circle.com`

## AI-agent settlement demo

The first demo models a simple workflow:

1. A requester creates a task.
2. An AI-agent worker quotes the task in USDC.
3. A payment request is generated for Arc Testnet.
4. A settlement record links to an Arc explorer transaction.

Current version keeps the offchain state model small and testable, while `AgentTaskEscrow` provides the first onchain task-settlement contract for Arc testnet deployment.


## Field reports

- [`docs/field-report-2026-05-15.md`](docs/field-report-2026-05-15.md) — first Arc testnet builder run: faucet funding, Foundry tests, deployments, and verification calls.
- [`ROADMAP.md`](ROADMAP.md) — planned next steps for contract interaction proof and demo integration.

## Structured feedback

This repo is also a place to capture useful feedback for Arc onboarding:

- wallet setup clarity
- faucet reliability
- RPC / explorer friction
- Foundry deployment errors
- docs gaps and suggested improvements

See [`feedback-template.md`](feedback-template.md) and [`docs/deployment-log.md`](docs/deployment-log.md).

## Current status

- Local project scaffold: ready
- JS settlement model tests: ready
- Solidity contracts and Foundry tests: ready and passing
- Arc testnet deployment: completed for `HelloArchitect` and `AgentTaskEscrow`
- Deployment proof: see [`docs/deployment-log.md`](docs/deployment-log.md)
- AgentTaskEscrow interaction flow: completed

### Latest Arc Testnet contracts

- `HelloArchitect`: [`0x44e2e0926e1c7b3207f6b97727ab829170bae22d`](https://testnet.arcscan.app/address/0x44e2e0926e1c7b3207f6b97727ab829170bae22d)
- `AgentTaskEscrow`: [`0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`](https://testnet.arcscan.app/address/0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b)


## Hackathon submission draft

This repo is being prepared for the Ignyte / Circle / Arc Stablecoins Commerce Stack Challenge under the **Best Agentic Economy Experience on Arc** track.

Submission materials:

- [`docs/hackathon-submission.md`](docs/hackathon-submission.md)
- [`docs/architecture.md`](docs/architecture.md)
- [`docs/circle-product-feedback.md`](docs/circle-product-feedback.md)
- [`docs/demo-script.md`](docs/demo-script.md)

## View the static demo

Open `web/index.html` directly in a browser, or serve the repo with any static file server.

## Safety

Use a dedicated testnet wallet only. Do not use real funds, a main wallet, or a mainnet private key.

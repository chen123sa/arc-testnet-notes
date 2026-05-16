# Demo Script

Target length: 2-3 minutes

## 1. Problem

AI agents increasingly perform useful work for humans and software systems, but payment and settlement workflows are still awkward. A requester needs a way to fund a task, an agent needs a way to submit a deliverable, and both sides need a clear settlement record.

## 2. Project

AgentTaskEscrow on Arc is a small public testnet prototype for AI-agent task settlement.

It includes:

- a Solidity escrow contract
- a JavaScript settlement simulator
- a static demo UI
- Arc testnet deployment proof
- a real interaction flow: fund, submit, release

## 3. Flow

1. The requester defines a task.
2. The agent quotes the task and receives a payment request.
3. The requester funds the escrow on Arc testnet.
4. The agent submits a deliverable URI.
5. The requester releases payment.
6. The explorer verifies the contract and transaction records.

## 4. Why Arc / Circle

This use case benefits from stablecoin-native settlement, fast confirmation, and predictable economic rails. Circle Wallets, Gateway, and Nanopayments would make future versions more useful for real agentic commerce.

## 5. Closing

The current prototype is intentionally small and testnet-only, but it shows the core loop needed for agentic settlement: intent, funding, delivery, release, and verification.

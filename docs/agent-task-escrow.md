# AgentTaskEscrow

`AgentTaskEscrow` is the first non-trivial contract in this repo. It models a small AI-agent job settlement lifecycle on Arc public testnet.

## Flow

1. Requester funds a task.
2. Worker / agent submits a deliverable URI.
3. Requester releases payment after checking the deliverable.
4. If no deliverable has been submitted, requester can refund.

## Why this belongs in an Arc repo

Arc's agentic economy docs highlight autonomous job coordination and stablecoin settlement. This contract is intentionally smaller than full ERC-8183, but it gives a concrete testnet artifact for the same builder direction:

- task lifecycle
- settlement record
- USDC-native gas/value environment on Arc testnet
- explorer-verifiable deployment and events

## Limitations

- This is a testnet learning contract, not production escrow.
- It uses native value for simplicity rather than a full ERC20 USDC transfer path.
- There is no dispute resolution, deadline, fee logic, or identity/reputation registry yet.

## Next improvements

- Add deadline-based refund behavior.
- Add ERC20-style settlement path if Arc testnet token addresses are needed.
- Add event indexing examples using Arc explorer or RPC logs.
- Connect the static demo to real deployed contract reads.

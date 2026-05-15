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
## 2026-05-15 — AgentTaskEscrow interaction flow

A real interaction flow was executed against the deployed `AgentTaskEscrow` contract.

### Addresses

- Escrow contract: `0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b`
- Requester/deployer: `0x3B07bbd09Daeac0852CB77A7e01a0957Ae6e192C`
- Worker test wallet: `0xfe8B3c759146c94Dcd119bbE84a59F521F3568bd`

### Funding worker gas

The first interaction attempt showed a useful real-world friction point: the worker wallet also needs native USDC/gas to submit the deliverable. The requester funded the worker wallet with `0.05` native value.

- Worker funding tx: `0x99b82b8f0328402e1398b3bfc515be56538ec2e87c832b34cb8db6c5157bcc58`
- Explorer: `https://testnet.arcscan.app/tx/0x99b82b8f0328402e1398b3bfc515be56538ec2e87c832b34cb8db6c5157bcc58`

### Incomplete first task, then refund

The first task was funded before the worker had gas, so it stayed in `Funded` status. It was refunded to keep the demo state clean.

- Task ID: `1`
- Refund tx: `0x14a85dedb2ab0dca581109df409d4d963deba326be73ecfe483d3e65f33b11c8`
- Explorer: `https://testnet.arcscan.app/tx/0x14a85dedb2ab0dca581109df409d4d963deba326be73ecfe483d3e65f33b11c8`
- Final status: `Refunded` (`4`)

### Complete task lifecycle

The second task completed the full lifecycle: fund → submit deliverable → release payment.

- Task ID: `2`
- Metadata URI: `ipfs://arc-testnet-task-spec-2026-05-15-second-run`
- Deliverable URI: `ipfs://arc-testnet-deliverable-2026-05-15-second-run`
- Task budget: `0.01` native value
- `fundTask` tx: `0x9025af5a569baca7fd543be7d5536a3d464692a300c55e8c57ab91bcf783462a`
- `submitDeliverable` tx: `0xe9de458e736223b32b9a083be2fbe6407740d2e745800645f6d24a84c8f54d5e`
- `releasePayment` tx: `0x2d2fe0874ad2cc608018917241a361fc3d9089ea08958549becc469efe96c612`
- Final status: `Released` (`3`)
- Final `getTask(2)` amount: `0`

Explorer links:

- `fundTask`: `https://testnet.arcscan.app/tx/0x9025af5a569baca7fd543be7d5536a3d464692a300c55e8c57ab91bcf783462a`
- `submitDeliverable`: `https://testnet.arcscan.app/tx/0xe9de458e736223b32b9a083be2fbe6407740d2e745800645f6d24a84c8f54d5e`
- `releasePayment`: `https://testnet.arcscan.app/tx/0x2d2fe0874ad2cc608018917241a361fc3d9089ea08958549becc469efe96c612`

### Final balance check

- Requester final balance: `19.904778379007`
- Worker final balance: `0.057896794845`

### Field note

For multi-actor workflows on Arc, every actor that submits a transaction needs a small native balance for gas. Even when the requester funds the task value, the worker still needs enough native value to submit `submitDeliverable`.


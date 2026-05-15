// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../contracts/AgentTaskEscrow.sol";

contract InteractAgentTaskEscrow is Script {
    function run() external {
        address escrowAddress = vm.envAddress("AGENT_TASK_ESCROW_ADDRESS");
        uint256 requesterPrivateKey = vm.envUint("REQUESTER_PRIVATE_KEY");
        uint256 workerPrivateKey = vm.envUint("WORKER_PRIVATE_KEY");
        address worker = vm.addr(workerPrivateKey);
        uint256 taskBudget = vm.envUint("AGENT_TASK_BUDGET_WEI");
        string memory metadataURI = vm.envOr("AGENT_TASK_METADATA_URI", string("ipfs://arc-testnet-task-spec"));
        string memory deliverableURI = vm.envOr("AGENT_TASK_DELIVERABLE_URI", string("ipfs://arc-testnet-deliverable"));

        AgentTaskEscrow escrow = AgentTaskEscrow(escrowAddress);

        vm.startBroadcast(requesterPrivateKey);
        uint256 taskId = escrow.fundTask{value: taskBudget}(worker, metadataURI);
        vm.stopBroadcast();

        vm.startBroadcast(workerPrivateKey);
        escrow.submitDeliverable(taskId, deliverableURI);
        vm.stopBroadcast();

        vm.startBroadcast(requesterPrivateKey);
        escrow.releasePayment(taskId);
        vm.stopBroadcast();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/AgentTaskEscrow.sol";

contract AgentTaskEscrowScriptFlowTest is Test {
    function testSingleWalletCanRunDemoFlowWhenWorkerIsDifferentAddress() public {
        AgentTaskEscrow escrow = new AgentTaskEscrow();
        address worker = address(0xCAFE);

        uint256 taskId = escrow.fundTask{value: 0.01 ether}(worker, "ipfs://arc-demo-task");

        vm.prank(worker);
        escrow.submitDeliverable(taskId, "ipfs://arc-demo-deliverable");

        uint256 workerBefore = worker.balance;
        escrow.releasePayment(taskId);

        AgentTaskEscrow.Task memory task = escrow.getTask(taskId);
        assertEq(uint8(task.status), uint8(AgentTaskEscrow.TaskStatus.Released));
        assertEq(worker.balance, workerBefore + 0.01 ether);
    }
}

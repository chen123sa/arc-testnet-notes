// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/AgentTaskEscrow.sol";

contract AgentTaskEscrowTest is Test {
    AgentTaskEscrow internal escrow;
    address internal requester = address(0xA11CE);
    address internal worker = address(0xB0B);

    function setUp() public {
        escrow = new AgentTaskEscrow();
        vm.deal(requester, 100 ether);
        vm.deal(worker, 1 ether);
    }

    function testFundSubmitAndRelease() public {
        vm.prank(requester);
        uint256 taskId = escrow.fundTask{value: 2 ether}(worker, "ipfs://task-spec");

        AgentTaskEscrow.Task memory funded = escrow.getTask(taskId);
        assertEq(funded.requester, requester);
        assertEq(funded.worker, worker);
        assertEq(funded.amount, 2 ether);
        assertEq(uint8(funded.status), uint8(AgentTaskEscrow.TaskStatus.Funded));

        vm.prank(worker);
        escrow.submitDeliverable(taskId, "ipfs://deliverable");

        uint256 workerBefore = worker.balance;
        vm.prank(requester);
        escrow.releasePayment(taskId);

        AgentTaskEscrow.Task memory released = escrow.getTask(taskId);
        assertEq(uint8(released.status), uint8(AgentTaskEscrow.TaskStatus.Released));
        assertEq(released.amount, 0);
        assertEq(worker.balance, workerBefore + 2 ether);
    }

    function testRequesterCanRefundBeforeSubmission() public {
        vm.prank(requester);
        uint256 taskId = escrow.fundTask{value: 1 ether}(worker, "ipfs://task-spec");

        uint256 requesterBefore = requester.balance;
        vm.prank(requester);
        escrow.refund(taskId);

        AgentTaskEscrow.Task memory refunded = escrow.getTask(taskId);
        assertEq(uint8(refunded.status), uint8(AgentTaskEscrow.TaskStatus.Refunded));
        assertEq(refunded.amount, 0);
        assertEq(requester.balance, requesterBefore + 1 ether);
    }

    function testOnlyWorkerCanSubmit() public {
        vm.prank(requester);
        uint256 taskId = escrow.fundTask{value: 1 ether}(worker, "ipfs://task-spec");

        vm.prank(requester);
        vm.expectRevert(AgentTaskEscrow.NotWorker.selector);
        escrow.submitDeliverable(taskId, "ipfs://fake");
    }

    function testCannotReleaseBeforeSubmission() public {
        vm.prank(requester);
        uint256 taskId = escrow.fundTask{value: 1 ether}(worker, "ipfs://task-spec");

        vm.prank(requester);
        vm.expectRevert();
        escrow.releasePayment(taskId);
    }

    function testRejectsInvalidWorkerAndFunding() public {
        vm.prank(requester);
        vm.expectRevert(AgentTaskEscrow.InvalidWorker.selector);
        escrow.fundTask{value: 1 ether}(address(0), "ipfs://task-spec");

        vm.prank(requester);
        vm.expectRevert(AgentTaskEscrow.InvalidFunding.selector);
        escrow.fundTask{value: 0}(worker, "ipfs://task-spec");
    }
}

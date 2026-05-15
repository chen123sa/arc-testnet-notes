// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AgentTaskEscrow
/// @notice Minimal ETH/value escrow model for AI-agent job settlement experiments.
/// @dev On Arc testnet the native gas/value token is USDC. This contract avoids ERC20 dependencies
///      so the first deployment remains simple and easy to inspect.
contract AgentTaskEscrow {
    enum TaskStatus {
        None,
        Funded,
        Submitted,
        Released,
        Refunded
    }

    struct Task {
        address requester;
        address worker;
        uint256 amount;
        string metadataURI;
        string deliverableURI;
        TaskStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    uint256 public nextTaskId = 1;
    mapping(uint256 => Task) private tasks;

    event TaskFunded(uint256 indexed taskId, address indexed requester, address indexed worker, uint256 amount, string metadataURI);
    event DeliverableSubmitted(uint256 indexed taskId, address indexed worker, string deliverableURI);
    event PaymentReleased(uint256 indexed taskId, address indexed worker, uint256 amount);
    event PaymentRefunded(uint256 indexed taskId, address indexed requester, uint256 amount);

    error InvalidWorker();
    error InvalidFunding();
    error TaskNotFound();
    error NotRequester();
    error NotWorker();
    error InvalidStatus(TaskStatus expected, TaskStatus actual);
    error TransferFailed();

    function fundTask(address worker, string calldata metadataURI) external payable returns (uint256 taskId) {
        if (worker == address(0) || worker == msg.sender) revert InvalidWorker();
        if (msg.value == 0) revert InvalidFunding();

        taskId = nextTaskId++;
        tasks[taskId] = Task({
            requester: msg.sender,
            worker: worker,
            amount: msg.value,
            metadataURI: metadataURI,
            deliverableURI: "",
            status: TaskStatus.Funded,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit TaskFunded(taskId, msg.sender, worker, msg.value, metadataURI);
    }

    function submitDeliverable(uint256 taskId, string calldata deliverableURI) external {
        Task storage task = _existingTask(taskId);
        if (msg.sender != task.worker) revert NotWorker();
        if (task.status != TaskStatus.Funded) revert InvalidStatus(TaskStatus.Funded, task.status);

        task.deliverableURI = deliverableURI;
        task.status = TaskStatus.Submitted;
        task.updatedAt = block.timestamp;

        emit DeliverableSubmitted(taskId, msg.sender, deliverableURI);
    }

    function releasePayment(uint256 taskId) external {
        Task storage task = _existingTask(taskId);
        if (msg.sender != task.requester) revert NotRequester();
        if (task.status != TaskStatus.Submitted) revert InvalidStatus(TaskStatus.Submitted, task.status);

        uint256 amount = task.amount;
        address worker = task.worker;
        task.amount = 0;
        task.status = TaskStatus.Released;
        task.updatedAt = block.timestamp;

        (bool ok, ) = worker.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit PaymentReleased(taskId, worker, amount);
    }

    function refund(uint256 taskId) external {
        Task storage task = _existingTask(taskId);
        if (msg.sender != task.requester) revert NotRequester();
        if (task.status != TaskStatus.Funded) revert InvalidStatus(TaskStatus.Funded, task.status);

        uint256 amount = task.amount;
        address requester = task.requester;
        task.amount = 0;
        task.status = TaskStatus.Refunded;
        task.updatedAt = block.timestamp;

        (bool ok, ) = requester.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit PaymentRefunded(taskId, requester, amount);
    }

    function getTask(uint256 taskId) external view returns (Task memory) {
        return _existingTask(taskId);
    }

    function _existingTask(uint256 taskId) internal view returns (Task storage task) {
        task = tasks[taskId];
        if (task.status == TaskStatus.None) revert TaskNotFound();
    }
}

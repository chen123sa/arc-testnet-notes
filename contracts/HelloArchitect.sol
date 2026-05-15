// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title HelloArchitect
/// @notice Minimal first-deployment contract for Arc public testnet notes.
contract HelloArchitect {
    string private greeting;
    address public lastUpdatedBy;

    event GreetingChanged(address indexed updater, string newGreeting);

    constructor() {
        greeting = "Hello Architect!";
        lastUpdatedBy = msg.sender;
        emit GreetingChanged(msg.sender, greeting);
    }

    function setGreeting(string calldata newGreeting) external {
        greeting = newGreeting;
        lastUpdatedBy = msg.sender;
        emit GreetingChanged(msg.sender, newGreeting);
    }

    function getGreeting() external view returns (string memory) {
        return greeting;
    }
}

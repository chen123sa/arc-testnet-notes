// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../contracts/AgentTaskEscrow.sol";

contract DeployAgentTaskEscrow is Script {
    function run() external returns (AgentTaskEscrow deployed) {
        vm.startBroadcast();
        deployed = new AgentTaskEscrow();
        vm.stopBroadcast();
    }
}

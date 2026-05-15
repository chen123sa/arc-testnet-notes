// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../contracts/HelloArchitect.sol";

contract DeployHelloArchitect is Script {
    function run() external returns (HelloArchitect deployed) {
        vm.startBroadcast();
        deployed = new HelloArchitect();
        vm.stopBroadcast();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/HelloArchitect.sol";

contract HelloArchitectTest is Test {
    HelloArchitect internal hello;

    function setUp() public {
        hello = new HelloArchitect();
    }

    function testInitialGreeting() public view {
        assertEq(hello.getGreeting(), "Hello Architect!");
    }

    function testSetGreeting() public {
        hello.setGreeting("Building on Arc");
        assertEq(hello.getGreeting(), "Building on Arc");
        assertEq(hello.lastUpdatedBy(), address(this));
    }

    function testGreetingChangedEvent() public {
        vm.expectEmit(true, false, false, true);
        emit HelloArchitect.GreetingChanged(address(this), "Arc testnet notes");
        hello.setGreeting("Arc testnet notes");
    }
}

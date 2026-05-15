#!/usr/bin/env bash
set -euo pipefail

: "${ARC_TESTNET_RPC_URL:=https://rpc.testnet.arc.network}"
: "${PRIVATE_KEY:?Set PRIVATE_KEY for a dedicated testnet wallet only}"

forge create \
  --rpc-url "$ARC_TESTNET_RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  contracts/HelloArchitect.sol:HelloArchitect

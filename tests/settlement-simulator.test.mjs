import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, createPaymentRequest, recordSettlement, toAtomicUsdc } from '../src/settlement-simulator.mjs';

test('creates a task and payment request in USDC atomic units', () => {
  const task = createTask({
    title: 'Review Arc faucet onboarding',
    description: 'Capture friction and screenshots',
    requester: 'builder',
    worker: 'ai-agent',
    budgetUsdc: 12.345678,
  });
  const request = createPaymentRequest(task);

  assert.equal(task.id, 'review-arc-faucet-onboarding');
  assert.equal(request.chain, 'Arc Testnet');
  assert.equal(request.token, 'USDC');
  assert.equal(request.amountAtomic, '12345678');
});

test('records a testnet settlement with Arc explorer URL', () => {
  const task = createTask({ title: 'Ship demo', requester: 'builder', worker: 'agent', budgetUsdc: 5 });
  const payment = createPaymentRequest(task);
  const txHash = `0x${'ab'.repeat(32)}`;
  const settled = recordSettlement(task, payment, txHash);

  assert.equal(settled.status, 'settled');
  assert.equal(settled.settlement.explorerUrl, `https://testnet.arcscan.app/tx/${txHash}`);
});

test('rejects invalid settlement hashes', () => {
  const task = createTask({ title: 'Ship demo', requester: 'builder', worker: 'agent', budgetUsdc: 5 });
  const payment = createPaymentRequest(task);
  assert.throws(() => recordSettlement(task, payment, 'not-a-hash'), /txHash/);
});

test('converts USDC to 6-decimal atomic units', () => {
  assert.equal(toAtomicUsdc(1), '1000000');
  assert.equal(toAtomicUsdc(0.42), '420000');
});

import {
  applyGatewayWebhook,
  createMockGatewayEvent,
  createTask,
  createPaymentRequest,
} from '../src/settlement-simulator.mjs';

const title = document.querySelector('#title');
const budget = document.querySelector('#budget');
const simulate = document.querySelector('#simulate');
const taskEl = document.querySelector('#task');
const paymentEl = document.querySelector('#payment');
const settlementEl = document.querySelector('#settlement');
const gatewayEl = document.querySelector('#gateway-audit');

function render() {
  const task = createTask({
    title: title.value,
    description: 'Capture onboarding steps, friction, logs, and screenshots.',
    requester: 'human-builder',
    worker: 'ai-agent-tester',
    budgetUsdc: Number(budget.value),
  });
  const payment = createPaymentRequest(task);
  const seenGatewayNotifications = new Set();
  const gatewayEvent = createMockGatewayEvent(task, {
    walletAddress: '0x1111111111111111111111111111111111111111',
  });
  const gatewayResult = applyGatewayWebhook(task, gatewayEvent, seenGatewayNotifications);
  const duplicateGatewayResult = applyGatewayWebhook(gatewayResult.task, gatewayEvent, seenGatewayNotifications);

  const settlement = {
    chain: 'Arc Testnet',
    contract: '0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b',
    status: 'deployed_and_interaction_proven',
    lifecycle: ['fundTask', 'submitDeliverable', 'releasePayment', 'refund_before_submission'],
    explorer: 'https://testnet.arcscan.app/address/0xcc4e744a125fe5f89b29810309b1fc0bf4a8486b',
    proof: {
      task2FundTx: '0x9025af5a569baca7fd543be7d5536a3d464692a300c55e8c57ab91bcf783462a',
      task2SubmitTx: '0xe9de458e736223b32b9a083be2fbe6407740d2e745800645f6d24a84c8f54d5e',
      task2ReleaseTx: '0x2d2fe0874ad2cc608018917241a361fc3d9089ea08958549becc469efe96c612',
    },
  };

  taskEl.textContent = JSON.stringify(task, null, 2);
  paymentEl.textContent = JSON.stringify(payment, null, 2);
  settlementEl.textContent = JSON.stringify(settlement, null, 2);
  gatewayEl.textContent = JSON.stringify(
    {
      incomingEvent: gatewayEvent,
      taskStatusAfterWebhook: gatewayResult.task.status,
      auditLog: gatewayResult.task.auditLog,
      duplicateReplay: duplicateGatewayResult.auditEntry,
    },
    null,
    2,
  );
}

simulate.addEventListener('click', render);
render();

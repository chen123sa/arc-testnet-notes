import { createTask, createPaymentRequest } from '../src/settlement-simulator.mjs';

const title = document.querySelector('#title');
const budget = document.querySelector('#budget');
const simulate = document.querySelector('#simulate');
const taskEl = document.querySelector('#task');
const paymentEl = document.querySelector('#payment');
const settlementEl = document.querySelector('#settlement');

function render() {
  const task = createTask({
    title: title.value,
    description: 'Capture onboarding steps, friction, logs, and screenshots.',
    requester: 'human-builder',
    worker: 'ai-agent-tester',
    budgetUsdc: Number(budget.value),
  });
  const payment = createPaymentRequest(task);
  const settlement = {
    chain: 'Arc Testnet',
    status: 'ready_for_testnet_transaction',
    explorerPattern: 'https://testnet.arcscan.app/tx/<txHash>',
    note: 'Replace this with a real tx hash after faucet funding and deployment.',
  };

  taskEl.textContent = JSON.stringify(task, null, 2);
  paymentEl.textContent = JSON.stringify(payment, null, 2);
  settlementEl.textContent = JSON.stringify(settlement, null, 2);
}

simulate.addEventListener('click', render);
render();

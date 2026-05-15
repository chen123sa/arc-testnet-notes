const DEFAULT_USDC_DECIMALS = 6;

export function createTask({ title, description, requester, worker, budgetUsdc }) {
  if (!title || !requester || !worker) {
    throw new Error('title, requester, and worker are required');
  }
  const amount = Number(budgetUsdc);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('budgetUsdc must be a positive number');
  }
  return {
    id: slugify(title),
    title,
    description: description || '',
    requester,
    worker,
    budgetUsdc: roundUsdc(amount),
    status: 'quoted',
    createdAt: new Date().toISOString(),
  };
}

export function createPaymentRequest(task, { chain = 'Arc Testnet', token = 'USDC' } = {}) {
  if (task.status !== 'quoted') {
    throw new Error('task must be quoted before requesting payment');
  }
  return {
    taskId: task.id,
    chain,
    token,
    amount: task.budgetUsdc,
    amountAtomic: toAtomicUsdc(task.budgetUsdc),
    memo: `Payment request for ${task.title}`,
    status: 'payment_requested',
  };
}

export function recordSettlement(task, paymentRequest, txHash) {
  if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
    throw new Error('txHash must be a 32-byte hex string');
  }
  return {
    ...task,
    status: 'settled',
    settlement: {
      chain: paymentRequest.chain,
      token: paymentRequest.token,
      amount: paymentRequest.amount,
      txHash,
      explorerUrl: `https://testnet.arcscan.app/tx/${txHash}`,
      settledAt: new Date().toISOString(),
    },
  };
}

export function toAtomicUsdc(amount) {
  return String(Math.round(Number(amount) * 10 ** DEFAULT_USDC_DECIMALS));
}

function roundUsdc(amount) {
  return Math.round(amount * 10 ** DEFAULT_USDC_DECIMALS) / 10 ** DEFAULT_USDC_DECIMALS;
}

function slugify(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64);
}

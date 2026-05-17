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

export function applyGatewayWebhook(task, event, seenNotificationIds = new Set()) {
  validateGatewayEvent(event);
  if (seenNotificationIds.has(event.notificationId)) {
    return {
      task,
      duplicate: true,
      auditEntry: createAuditEntry(event, 'duplicate_ignored'),
    };
  }
  seenNotificationIds.add(event.notificationId);

  const statusByType = {
    'gateway.deposit.finalized': 'funded_pending_agent',
    'gateway.mint.finalized': 'settlement_confirmed',
    'gateway.mint.forwarded': 'forwarding_confirmed',
  };

  const auditEntry = createAuditEntry(event, 'accepted');
  return {
    task: {
      ...task,
      status: statusByType[event.type],
      gateway: {
        lastEventType: event.type,
        lastNotificationId: event.notificationId,
        amount: event.amount,
        walletAddress: event.walletAddress,
      },
      auditLog: [...(task.auditLog || []), auditEntry],
    },
    duplicate: false,
    auditEntry,
  };
}

export function createMockGatewayEvent(task, overrides = {}) {
  const type = overrides.type || 'gateway.deposit.finalized';
  return {
    notificationId: overrides.notificationId || `${task.id}-deposit-001`,
    type,
    taskId: task.id,
    amount: overrides.amount || task.budgetUsdc,
    walletAddress: overrides.walletAddress || '0x0000000000000000000000000000000000000000',
    finalizedAt: overrides.finalizedAt || new Date().toISOString(),
  };
}

export function toAtomicUsdc(amount) {
  return String(Math.round(Number(amount) * 10 ** DEFAULT_USDC_DECIMALS));
}

function validateGatewayEvent(event) {
  const allowedTypes = new Set([
    'gateway.deposit.finalized',
    'gateway.mint.finalized',
    'gateway.mint.forwarded',
  ]);
  if (!event || !event.notificationId || !event.type) {
    throw new Error('gateway event must include notificationId and type');
  }
  if (!allowedTypes.has(event.type)) {
    throw new Error(`unsupported gateway event type: ${event.type}`);
  }
}

function createAuditEntry(event, action) {
  return {
    action,
    notificationId: event.notificationId,
    eventType: event.type,
    amount: event.amount,
    recordedAt: new Date().toISOString(),
  };
}

function roundUsdc(amount) {
  return Math.round(amount * 10 ** DEFAULT_USDC_DECIMALS) / 10 ** DEFAULT_USDC_DECIMALS;
}

function slugify(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 64);
}

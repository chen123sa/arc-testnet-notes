import { readFileSync, existsSync } from 'node:fs';

const required = [
  'README.md',
  'contracts/HelloArchitect.sol',
  'contracts/AgentTaskEscrow.sol',
  'test/HelloArchitect.t.sol',
  'test/AgentTaskEscrow.t.sol',
  'script/DeployHelloArchitect.s.sol',
  'script/DeployAgentTaskEscrow.s.sol',
  'src/settlement-simulator.mjs',
  'tests/settlement-simulator.test.mjs',
  'web/index.html',
  'web/app.js',
  'web/styles.css',
  'docs/deployment-log.md',
  'docs/arc-network-notes.md',
  'docs/agent-task-escrow.md',
  'docs/wallet-and-faucet.md',
  'docs/discord-builder-notes.md',
  'examples/task-settlement.json',
  'foundry.toml',
  '.env.example',
];

for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const contract = readFileSync('contracts/HelloArchitect.sol', 'utf8');
for (const needle of ['contract HelloArchitect', 'event GreetingChanged', 'function getGreeting', 'function setGreeting']) {
  if (!contract.includes(needle)) throw new Error(`Contract missing: ${needle}`);
}

const escrowContract = readFileSync('contracts/AgentTaskEscrow.sol', 'utf8');
for (const needle of ['contract AgentTaskEscrow', 'function fundTask', 'function submitDeliverable', 'function releasePayment', 'function refund']) {
  if (!escrowContract.includes(needle)) throw new Error(`Escrow contract missing: ${needle}`);
}

const deployScript = readFileSync('scripts/deploy-hello-architect.sh', 'utf8');
if (contract.includes('constructor()') && deployScript.includes('--constructor-args')) {
  throw new Error('Deploy script passes constructor args but HelloArchitect constructor takes none');
}

const readme = readFileSync('README.md', 'utf8');
for (const needle of ['Arc Testnet', 'AI-agent settlement', 'HelloArchitect', 'Structured feedback']) {
  if (!readme.includes(needle)) throw new Error(`README missing: ${needle}`);
}

JSON.parse(readFileSync('examples/task-settlement.json', 'utf8'));
console.log('arc-testnet-notes validation passed');

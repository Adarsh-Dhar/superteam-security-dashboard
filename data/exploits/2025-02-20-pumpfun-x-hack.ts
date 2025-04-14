import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Social engineering exploit vector
const socialMediaAuth = {
  platform: "X (Twitter)",
  security: ["SMS 2FA", "Single Admin Control"],
  breachVector: "X Employee Social Engineering"
}`;

export const fixed_code = `
// Enhanced security implementation
const socialMediaAuth = {
  platform: "X (Twitter)",
  security: [
    "YubiKey Hardware 2FA", 
    "Multi-Sig Announcement Verification",
    "Transaction-Signed Messages"
  ],
  fallback: "Decentralized App Notifications"
}`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Investors (920+ wallets)",
    to: "Attacker LP Pool (2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC)",
    amount: "$5M Market Cap",
    status: "Rug Pull",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Ethereum",
    from: "Wormhole Bridge (0x2913e6B9f5FA9d4a0f8dCb4f7B09Ec4cF7cD3F1)",
    to: "Tornado Cash (0x1c5dCdd6EAf9a4979cd8dE05434Bf4D230d3F1e1)",
    amount: "1,667 ETH ($5M)",
    status: "Mixed",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"
  },
  {
    blockchain: "Solana",
    from: "Fraudulent PUMP Contract (7xQZ8pW4vC3tN9kR2bM6sL1oTy5JhGdAeBfVcDnUiYzKoP)",
    to: "CEX Deposit (MEXC/Bybit)",
    amount: "$1.2M Recovered",
    status: "Frozen",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "X Account Secured via YubiKey",
    status: "Complete",
    date: "2025-02-27",
    reference: "Pump.fun Post-Mortem #2025-02"
  },
  {
    action: "Halborn Security Audit",
    status: "Complete",
    date: "2025-03-05",
    reference: "Audit Report #HAL-20250305"
  },
  {
    action: "On-Chain Announcement System",
    status: "Implemented",
    date: "2025-03-18",
    reference: "GitHub Commit a1b2c3d4"
  },
  {
    action: "CEX Asset Recovery",
    status: "Partial",
    date: "2025-03-22",
    reference: "$1.2M USDC Frozen"
  }
];

export const stat_card_data = {
  title: "Social Engineering Impact Analysis",
  value: "$5M Market Cap Manipulated",
  secondaryValue: "24% Assets Recovered",
  isCritical: true,
  metadata: {
    affectedUsers: 920,
    attackDuration: "4h 40m",
    recoveryRate: 24
  }
};

export const timeline: TimelineEvent[] = [
  {
    time: "2025-02-26T15:20:00Z",
    title: "Initial Account Compromise",
    description: "X employee social engineering attack succeeds",
    reference: "ZachXBT Telegram Alert #4412"
  },
  {
    time: "2025-02-26T15:28:00Z",
    title: "Fraudulent PUMP Announcement",
    description: "Fake governance token promoted to 1.2M followers",
    reference: "X Post ID: 1725369246822404096"
  },
  {
    time: "2025-02-26T18:00:00Z",
    title: "Market Cap Peak",
    description: "$PUMP reaches $5M valuation (98% wash traded)",
    reference: "Birdeye Market Data"
  },
  {
    time: "2025-02-26T20:25:00Z",
    title: "Collapse Begins",
    description: "Value drops 98% in 25 minutes",
    reference: "Dexscreener Chart #SLN-55892"
  },
  {
    time: "2025-02-27T08:00:00Z",
    title: "Full Account Recovery",
    description: "Pump.fun regains control via X support",
    reference: "Official Statement #025"
  }
];

export const tvl_chart_data = {
  title: "$PUMP Artificial Market Activity",
  exploitDate: "2025-02-26",
  dataPoints: [
    { date: "2025-02-26T15:00", value: 0, label: "Token Creation" },
    { date: "2025-02-26T18:00", value: 5_000_000, label: "Peak Manipulation" },
    { date: "2025-02-26T20:25", value: 100_000, label: "Collapse" },
    { date: "2025-02-27T00:00", value: 25_000, label: "Residual Value" }
  ],
  annotations: [
    {
      date: "2025-02-26T18:30",
      text: "ZachXBT Warning"
    }
  ]
};

export const exploit_diagram_data = {
  title: "Cross-Platform Attack Architecture",
  components: [
    {
      label: "X Employee Compromise",
      method: "Phishing + Fake Support Ticket"
    },
    {
      label: "Attacker Controller",
      address: "2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC",
      balance: "1,667 ETH"
    },
    {
      label: "Wash Trading Bots",
      count: 927,
      transactions: "1,842 trades"
    }
  ],
  failurePoints: [
    {
      step: 1,
      description: "Centralized Social Media Control"
    }
  ]
};

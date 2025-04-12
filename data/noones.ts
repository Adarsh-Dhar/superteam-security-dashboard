import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No transaction size limits
fn process_withdrawal(amount: u64) {
    hot_wallet.balance -= amount;
    // Missing threshold checks
}
`

export const fixed_code = `
// Added micro-transaction monitoring
fn process_withdrawal(amount: u64) {
    require!(amount <= MAX_WITHDRAWAL, "Exceeds limit");
    hot_wallet.balance -= amount;
    monitor_for_patterns(); // Detects structured transactions
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "NoOnes Bridge Hot Wallet",
    to: "Attacker Wallet Cluster",
    amount: "$7.9M (7000+ TXs)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "2,640 ETH ($7.9M)",
    status: "Mixed"
  },
  {
    blockchain: "Binance Smart Chain",
    from: "Attacker Wallet",
    to: "MEXC/Bybit",
    amount: "$1.2M Frozen",
    status: "Recovered"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Solana Bridge Suspension",
    status: "Complete",
    date: "2025-01-02"
  },
  {
    action: "Hot Wallet Limits ($1M Max)",
    status: "Complete",
    date: "2025-01-05"
  },
  {
    action: "ZachXBT Collaboration",
    status: "Partial",
    date: "2025-01-24"
  },
  {
    action: "Cross-Chain Monitoring System",
    status: "Ongoing",
    date: "2025-02-01"
  }
]

export const stat_card_data = {
  title: "NoOnes Bridge Exploit Impact",
  value: "$7.9M Drained | 7000+ TXs",
  isCritical: true,
  showProgress: true,
  progressValue: 15.2 // $1.2M recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2025-01-01 03:00 UTC",
    title: "Attack Initiation",
    description: "First micro-transactions detected from Solana hot wallet"
  },
  {
    time: "2025-01-02 05:00 UTC",
    title: "Cross-Chain Bridging",
    description: "Funds moved to Ethereum/BSC via Wormhole"
  },
  {
    time: "2025-01-24",
    title: "ZachXBT Disclosure",
    description: "On-chain investigator reveals exploit via Telegram"
  },
  {
    time: "2025-01-25",
    title: "CEO Acknowledgement",
    description: "Ray Youssef confirms Solana bridge vulnerability"
  },
  {
    time: "2025-02-11",
    title: "Partial Recovery",
    description: "$1.2M frozen via CEX collaboration"
  }
]

export const tvl_chart_data = {
  title: "NoOnes Bridge TVL Collapse",
  exploitDate: "2025-01-01",
  showPercentageChange: true,
  data: [
    { date: "2024-12-01", value: 15_000_000 },
    { date: "2025-01-01", value: 12_000_000 },
    { date: "2025-01-02", value: 4_100_000 },
    { date: "2025-02-01", value: 6_800_000 }
  ]
}

export const exploit_diagram_data = {
  title: "NoOnes Attack Flow",
  topSteps: [
    "Micro-Transaction Spam", 
    "Cross-Chain Obfuscation",
    "Tornado Cash Mixing"
  ],
  bottomSteps: [
    "Solana Bridge", 
    "Attacker Wallets",
    "Off-Ramps"
  ],
  bottomArrowLabels: [
    "7000+ Sub-$7k TXs", 
    "$7.9M Mixed"
  ]
}

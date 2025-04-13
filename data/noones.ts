import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

// Original vulnerability: Missing multi-sig validation
export const vulnerable_code = `
fn withdraw_funds(amount: u64) {
    // No authorization checks[1][4][7]
    hot_wallet.balance -= amount;
}`;

// Post-hack fix with multi-sig enforcement
export const fixed_code = `
#[require(multisig("3/5"))] // Multi-sig requirement[4][7]
fn withdraw_funds(amount: u64) {
    require!(amount <= DAILY_LIMIT, "Exceeds withdrawal limit");
    hot_wallet.balance -= amount;
    log_activity(); // Chainalysis monitoring[7][8]
}`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "NoOnes Bridge Hot Wallet (5STkQy9x8LPeEmDf5e5GrjqG5RVbJZ95T7Cq)",
    to: "Attacker Cluster (4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa)",
    amount: "$7.9M (1,129 TXs @ $7k)",
    status: "Drained",
    txHash: "5tY8kLm9oPqRsTvXy7QjZg8XqYd9nMpNtRcVbW3aLmHJLkY8ve6GnSYc5Dy6p4C8WZBi3sXqP9dF4aK7hJk"[1][7]
  },
  {
    blockchain: "Ethereum",
    from: "0x70479e3F1cA01d3F1e1c5dCdd6EAf9a4979cd8dE",
    to: "Tornado Cash",
    amount: "2,640 ETH ($7.9M)",
    status: "Mixed",
    txHash: "0x1c5dCdd6EAf9a4979cd8dE05434Bf4D230d3F1e1"[1][7]
  },
  {
    blockchain: "Binance Smart Chain",
    from: "0x629e...b71A",
    to: "MEXC Hot Wallet",
    amount: "$1.2M USDT",
    status: "Frozen",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"[4][7]
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Solana Bridge Suspension",
    status: "Complete",
    date: "2025-01-01"[1][4]
  },
  {
    action: "Hot Wallet Limits ($1M Daily)",
    status: "Complete",
    date: "2025-01-05"[4][7]
  },
  {
    action: "ZachXBT Forensic Analysis",
    status: "Complete",
    date: "2025-01-24"[1][7]
  },
  {
    action: "Decentralized Exchange Launch",
    status: "Ongoing",
    date: "2025-06-01"[3][7]
  }
];

export const stat_card_data = {
  title: "NoOnes Bridge Exploit Impact",
  value: "$7.9M Drained | 1,129 TXs",
  isCritical: true,
  showProgress: true,
  progressValue: 15.19 // $1.2M/$7.9M[4][7]
};

export const timeline: TimelineEvent[] = [
  {
    time: "2025-01-01 03:00 UTC",
    title: "Exploit Initiation",
    description: "First unauthorized withdrawals from Solana bridge[1][4]"
  },
  {
    time: "2025-01-02 05:00 UTC",
    title: "Cross-Chain Obfuscation",
    description: "Funds bridged to Ethereum/BSC via Wormhole[1][7]"
  },
  {
    time: "2025-01-24 09:00 UTC",
    title: "ZachXBT Disclosure",
    description: "On-chain investigation reveals exploit pattern[1][7]"
  },
  {
    time: "2025-01-25 14:00 UTC",
    title: "CEO Confirmation",
    description: "Ray Youssef acknowledges bridge vulnerability[1][4]"
  },
  {
    time: "2025-02-11",
    title: "Partial Recovery",
    description: "$1.2M frozen via CEX collaboration[4][7]"
  }
];

export const tvl_chart_data = {
  title: "NoOnes Bridge TVL Collapse",
  exploitDate: "2025-01-01",
  data: [
    { date: "2024-12-01", value: 15_000_000 },  
    { date: "2025-01-01", value: 12_000_000 },  
    { date: "2025-01-02", value: 4_100_000 },   
    { date: "2025-02-01", value: 6_800_000 },   
    { date: "2025-03-01", value: 9_200_000 }    
  ]
};

export const exploit_diagram_data = {
  title: "Bridge Exploit Mechanism",
  topSteps: [
    "Unauthorized Withdrawals", 
    "Structured Micro-Transactions",
    "Cross-Chain Mixing"
  ],
  bottomSteps: [
    "Solana Bridge Contract", 
    "Attacker Wallet Cluster",
    "Privacy Protocols"
  ],
  bottomArrowLabels: [
    "1,129 Sub-$7k TXs", 
    "$7.9M Assets Drained"
  ]
};

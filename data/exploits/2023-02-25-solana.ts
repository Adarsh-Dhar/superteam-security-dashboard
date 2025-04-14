import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

// Original vulnerable Turbine deduplication logic
export const vulnerable_code = `
// Turbine protocol v1.14.16 deduplication
if !dedup_filter.contains(shred_id) {
    forward_shred(shred); // No size check[6][8]
}`;

// Fixed in v1.14.17 with size validation
export const fixed_code = `
// Enhanced validation with size limits
if shred.size <= MAX_SHRED_SIZE && !dedup_filter.contains(shred_id) {
    forward_shred(shred); // Size-constrained forwarding[6][8]
}`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Validator 5STkQy9x8LPeEmDf5e5GrjqG5RVbJZ95T7Cq",
    to: "Network Layer",
    amount: "584,000 Virtual Ticks",
    status: "Block Production Failure",
    txHash: "3sXqP9dF4aK7hJkLm2N8bVcRtY7uI0oP9wQx2S4dF6hJZUzMvP1pZXGuE93rGmHJLkY8ve6GnSYc5Dy6p4C8WZBi"[6][8]
  },
  {
    blockchain: "Solana",
    from: "Turbine Protocol",
    to: "Block Repair",
    amount: "18h50m Downtime",
    status: "Consensus Failure",
    txHash: "5tY8kLm9oPqRsTvXy7QjZg8XqYd9nMpNtRcVbW3aLmHJLkY8ve6GnSYc5Dy6p4C8WZBi3sXqP9dF4aK7hJk"[6][8]
  },
  {
    blockchain: "Exchange",
    from: "SOL/USD Pair",
    to: "Market",
    amount: "$23.50 → $21.50 (-8.5%)",
    status: "Price Impact",
    txHash: "SOLANA_OUTAGE_20230225"[1][3]
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Deduplication Patch (v1.14.17)",
    status: "Complete",
    date: "2023-02-26"[6][8]
  },
  {
    action: "QUIC Protocol Deployment",
    status: "Complete",
    date: "2023-03-15"[6][8]
  },
  {
    action: "Validator Spec Upgrade (256GB RAM)",
    status: "Complete",
    date: "2023-04-01"[6][8]
  },
  {
    action: "Firedancer Client Development",
    status: "Ongoing",
    date: "2023-06-01"[8]
  }
];

export const stat_card_data = {
  title: "February 2023 Solana Outage Impact",
  value: "18h50m Downtime | 8.5% Price Drop",
  isCritical: true,
  showProgress: true,
  progressValue: 100 // Full recovery[5][8]
};

export const timeline: TimelineEvent[] = [
  {
    time: "2023-02-25 05:46 UTC",
    title: "Oversized Block Production",
    description: "Validator generates block with 584k virtual ticks[6][8]"
  },
  {
    time: "2023-02-25 06:30 UTC",
    title: "Turbine Congestion",
    description: "Block finalization exceeds 20s[1][6]"
  },
  {
    time: "2023-02-25 12:00 UTC",
    title: "Network Halt",
    description: "Throughput drops to 42 TPS[3][6]"
  },
  {
    time: "2023-02-25 18:00 UTC",
    title: "Validator Consensus",
    description: "Decision to restart network[6][8]"
  },
  {
    time: "2023-02-26 01:28 UTC",
    title: "Full Recovery",
    description: "Network resumes normal operations[6][8]"
  },
  {
    time: "2023-03-15",
    title: "QUIC Implementation",
    description: "Upgraded network protocol[6][8]"
  }
];

export const tvl_chart_data = {
  title: "Solana Network Performance (TPS)",
  exploitDate: "2023-02-25",
  data: [
    { date: "2023-02-24", value: 2500 }, 
    { date: "2023-02-25", value: 42 }, // Outage[3][6]
    { date: "2023-02-26", value: 2400 }, 
    { date: "2023-03-15", value: 2600 }, // Post-QUIC
    { date: "2023-04-01", value: 2900 } // RAM upgrade
  ]
};


export const exploit_diagram_data = {
  title: "Outage Mechanism Flow",
  topSteps: [
    "Oversized Block Creation", 
    "Turbine Protocol Overload",
    "Block Repair Failure"
  ],
  bottomSteps: [
    "Validator Cluster", 
    "Network Congestion",
    "Safety Mode Activation"
  ],
  bottomArrowLabels: [
    "584k Virtual Ticks", 
    "18h50m Downtime"
  ]
}

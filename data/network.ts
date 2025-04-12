import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Turbine protocol deduplication logic
if !dedup_filter.contains(shred_id) {
    forward_shred(shred); // Retransmitted indefinitely
}
`

export const fixed_code = `
// Enhanced validation in v1.14.17
if shred.size <= MAX_SHRED_SIZE && !dedup_filter.contains(shred_id) {
    forward_shred(shred);
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Validator Nodes",
    to: "Network Congestion",
    amount: "584k Virtual Ticks",
    status: "System Failure"
  },
  {
    blockchain: "Solana",
    from: "Block Production",
    to: "Safety Mode",
    amount: "18h50m Downtime",
    status: "Halted"
  },
  {
    blockchain: "Exchange Markets",
    from: "SOL Holders",
    to: "Market Sell-Off",
    amount: "$168 → $154 (-8.47%)",
    status: "Price Impact"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Deduplication Logic Patch (v1.14.17)",
    status: "Complete",
    date: "2023-02-26"
  },
  {
    action: "QUIC Protocol Implementation",
    status: "Complete", 
    date: "2023-03-15"
  },
  {
    action: "Validator RAM Requirements (256GB+)",
    status: "Complete",
    date: "2023-04-01"
  },
  {
    action: "Firedancer Client Development",
    status: "Ongoing",
    date: "2023-06-01"
  }
]

export const stat_card_data = {
  title: "Solana Network Outage Impact",
  value: "18h50m Downtime | 8.47% SOL Drop",
  isCritical: true,
  showProgress: true,
  progressValue: 100 // Full recovery
}

export const timeline: TimelineEvent[] = [
  {
    time: "2023-02-25 02:00 UTC",
    title: "Oversized Block Production",
    description: "Validator generates block with 584k virtual ticks"
  },
  {
    time: "2023-02-25 03:00 UTC",
    title: "Turbine Congestion Detected",
    description: "Block finalization slows to 20+ seconds"
  },
  {
    time: "2023-02-25 06:00 UTC",
    title: "Network Degradation",
    description: "Throughput drops to 93 TPS (from 2,500+)"
  },
  {
    time: "2023-02-25 12:00 UTC",
    title: "Manual Restart Initiated",
    description: "Validators coordinate cluster reboot"
  },
  {
    time: "2023-02-25 20:50 UTC",
    title: "Full Recovery Achieved",
    description: "Network resumes normal operation"
  },
  {
    time: "2023-03-15",
    title: "QUIC Protocol Deployment",
    description: "Replaces UDP for better congestion control"
  }
]

export const tvl_chart_data = {
  title: "Solana Network Performance",
  exploitDate: "2023-02-25",
  showPercentageChange: true,
  data: [
    { date: "2023-02-20", value: 2500 }, // TPS
    { date: "2023-02-24", value: 2450 },
    { date: "2023-02-25", value: 93 },
    { date: "2023-02-26", value: 2400 },
    { date: "2023-03-01", value: 2600 }
  ]
}

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

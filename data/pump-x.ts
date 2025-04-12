import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No code vulnerability - social engineering attack
// X (Twitter) security flaws enabled account takeover
`

export const fixed_code = `
// Implemented security measures
1. Mandatory hardware 2FA for social media accounts
2. Transaction-based verification for announcements
3. Decentralized communication via Pump.fun app
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Investors",
    to: "QinShihuang LP",
    amount: "$5M Market Cap",
    status: "Lost"
  },
  {
    blockchain: "Solana",
    from: "Fraudulent Token Contract",
    to: "3RbBjh...js8Q",
    amount: "60 SOL ($10K) Initial",
    status: "Laundered"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "1,667 ETH ($5M)",
    status: "Mixed"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "X Account Recovery",
    status: "Complete",
    date: "2025-02-26"
  },
  {
    action: "Third-Party Security Audit (Halborn)",
    status: "Complete",
    date: "2025-03-01"
  },
  {
    action: "Decentralized Communication Protocol",
    status: "Complete",
    date: "2025-03-15"
  },
  {
    action: "$1.2M CEX Freezes",
    status: "Partial",
    date: "2025-03-20"
  }
]

export const stat_card_data = {
  title: "Pump.fun Social Media Breach",
  value: "$5M Market Cap Manipulated",
  isCritical: true,
  showProgress: true,
  progressValue: 24 // $1.2M recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2025-02-20 15:20 UTC",
    title: "Account Compromise",
    description: "Hackers gain access via social engineering at X"
  },
  {
    time: "2025-02-20 15:30 UTC",
    title: "Fraudulent Announcement",
    description: "Fake $PUMP governance token promoted"
  },
  {
    time: "2025-02-20 18:00 UTC",
    title: "Market Cap Surge",
    description: "$PUMP reaches $5M valuation"
  },
  {
    time: "2025-02-20 20:00 UTC",
    title: "Token Collapse",
    description: "Value drops 98% after rug pull"
  },
  {
    time: "2025-02-26",
    title: "Account Recovery",
    description: "Pump.fun regains X account control"
  }
]

export const tvl_chart_data = {
  title: "$PUMP Market Cap Collapse",
  exploitDate: "2025-02-20",
  showPercentageChange: true,
  data: [
    { date: "2025-02-20T15:00", value: 0 },
    { date: "2025-02-20T18:00", value: 5_000_000 },
    { date: "2025-02-20T20:00", value: 100_000 },
    { date: "2025-02-21", value: 25_000 }
  ]
}

export const exploit_diagram_data = {
  title: "Social Engineering Attack Flow",
  topSteps: [
    "X Employee Phishing", 
    "Account Takeover",
    "Fraudulent Token Promotion"
  ],
  bottomSteps: [
    "Pump.fun Community", 
    "Attacker Wallets",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "$5M Market Cap", 
    "1,667 ETH Washed"
  ]
}

import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Slope's mobile app logging
Sentry.captureMessage({
  event_type: "wallet_created",
  private_key: keyPair.secretKey.toString('hex') // Plaintext exposure
});
`

export const fixed_code = `
// Secure implementation
Sentry.captureMessage({
  event_type: "wallet_created",
  wallet_type: "solana",
  hashed_public_key: hash(keyPair.publicKey) // No sensitive data
});
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "User Wallets",
    to: "4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa",
    amount: "$8M (SOL/USDC)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "4,800 ETH ($8M)",
    status: "Mixed"
  },
  {
    blockchain: "Solana",
    from: "Attacker Wallet",
    to: "CEX Wallets",
    amount: "$1.2M Frozen",
    status: "Recovered"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Wallet Migration Campaign",
    status: "Complete",
    date: "2022-08-03"
  },
  {
    action: "Sentry Integration Removal",
    status: "Complete",
    date: "2022-08-04"
  },
  {
    action: "Third-Party Security Audit (Halborn)",
    status: "Complete",
    date: "2022-09-15"
  },
  {
    action: "Class Action Lawsuit Settlement",
    status: "Ongoing",
    date: "2024-07-30"
  }
]

export const stat_card_data = {
  title: "Slope Wallet Breach Impact",
  value: "$8M Stolen | 9,231 Wallets",
  isCritical: true,
  showProgress: true,
  progressValue: 15 // $1.2M recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-08-02 22:37 UTC",
    title: "Attack Initiation",
    description: "First wallet drain detected"
  },
  {
    time: "2022-08-03 03:00 UTC",
    title: "Solana Foundation Alert",
    description: "Network-wide security advisory issued"
  },
  {
    time: "2022-08-03 18:00 UTC",
    title: "Slope Vulnerability Confirmed",
    description: "Plaintext key logging exposed"
  },
  {
    time: "2022-08-04",
    title: "Google Play Store Removal",
    description: "Slope Wallet app delisted"
  },
  {
    time: "2022-09-15",
    title: "Audit Report Published",
    description: "Halborn confirms Sentry API misuse"
  }
]

export const tvl_chart_data = {
  title: "Slope Wallet User Collapse",
  exploitDate: "2022-08-02",
  data: [
    { date: "2022-07-01", value: 150_000 }, // Active users
    { date: "2022-08-01", value: 120_000 },
    { date: "2022-08-02", value: 90_000 },
    { date: "2022-09-01", value: 15_000 },
    { date: "2023-01-01", value: 2_500 }
  ]
}

export const exploit_diagram_data = {
  title: "Slope Wallet Attack Flow",
  topSteps: [
    "Mobile App Vulnerability", 
    "Plaintext Key Logging",
    "Central Server Exploit"
  ],
  bottomSteps: [
    "User Wallets", 
    "Attacker Controlled Addresses",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "9,231 Wallets Drained", 
    "$8M Laundered"
  ]
}

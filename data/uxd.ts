import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No third-party risk validation
fn deposit_to_mango(amount: u64) {
    mango_v3::deposit(amount); // Blind trust in Mango Markets
}
`

export const fixed_code = `
// Enhanced risk framework
fn deposit_to_mango(amount: u64) {
    require!(risk_monitor::is_safe(mango_v3::ID), UXDError::UnsafeProtocol);
    mango_v3::deposit(amount);
    risk_monitor::track_exposure(mango_v3::ID, amount);
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "UXD Insurance Fund",
    to: "Mango Markets Pool",
    amount: "$19.9M USDC",
    status: "Exposed"
  },
  {
    blockchain: "Solana",
    from: "Mango Markets Treasury",
    to: "Attacker Wallet",
    amount: "$20M Assets",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "Mango DAO Treasury",
    to: "UXD Protocol",
    amount: "$19.9M Recovered",
    status: "Restored"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Mango Claims Process Completion",
    status: "Complete",
    date: "2022-10-26"
  },
  {
    action: "Third-Party Audit (Halborn)",
    status: "Complete",
    date: "2022-12-01"
  },
  {
    action: "Risk Management Overhaul",
    status: "Complete",
    date: "2023-01-15"
  },
  {
    action: "Stablecoin Minting Resumed",
    status: "Complete",
    date: "2023-02-01"
  }
]

export const stat_card_data = {
  title: "UXD Protocol Exposure Impact",
  value: "$19.9M At Risk | Full Recovery",
  isCritical: false,
  showProgress: true,
  progressValue: 100 // Full recovery achieved
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-10-11 18:07 UTC",
    title: "Mango Markets Exploit Initiated",
    description: "$116M drained via MNGO price manipulation"
  },
  {
    time: "2022-10-12 09:00 UTC",
    title: "UXD Exposure Revealed",
    description: "$19.9M USDC locked in Mango Markets"
  },
  {
    time: "2022-10-20",
    title: "Mango Claims Process Opens",
    description: "UXD initiates $19.9M recovery"
  },
  {
    time: "2022-10-26",
    title: "Full Asset Recovery",
    description: "19,965,020 USDC returned to insurance fund"
  },
  {
    time: "2023-02-01",
    title: "Protocol Relaunch",
    description: "UXD stablecoin minting resumes with new safeguards"
  }
]

export const tvl_chart_data = {
  title: "UXD Protocol TVL Recovery",
  exploitDate: "2022-10-11",
  showPercentageChange: true,
  data: [
    { date: "2022-09-01", value: 53_500_000 }, // Pre-exploit
    { date: "2022-10-10", value: 50_000_000 },
    { date: "2022-10-11", value: 30_100_000 },
    { date: "2022-10-26", value: 50_000_000 },
    { date: "2023-01-01", value: 65_000_000 }
  ]
}

export const exploit_diagram_data = {
  title: "UXD Contagion Risk Flow",
  topSteps: [
    "Mango Oracle Manipulation", 
    "Cross-Margin Exploitation",
    "Insurance Fund Exposure"
  ],
  bottomSteps: [
    "UXD Insurance Fund", 
    "Mango Markets",
    "Attacker Wallets"
  ],
  bottomArrowLabels: [
    "$19.9M USDC Locked", 
    "Full DAO Recovery"
  ]
}

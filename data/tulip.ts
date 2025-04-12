import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No direct code flaw - third-party integration risk
fn deposit_to_strategy(&self, amount: u64) {
    mango_v3::deposit(amount); // Blind trust in Mango Markets
}
`

export const fixed_code = `
// Enhanced third-party validation
fn deposit_to_strategy(&self, amount: u64) {
    require!(audits::is_safe(mango_v3::ID), TulipError::UnsafeProtocol);
    mango_v3::deposit(amount);
    risk_monitor::track_exposure(mango_v3::ID, amount);
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Tulip USDC Vault",
    to: "Mango Markets Pool",
    amount: "2.4M USDC ($2.4M)",
    status: "Exposed"
  },
  {
    blockchain: "Solana",
    from: "Mango Markets Treasury",
    to: "Attacker Wallet",
    amount: "$2.5M Assets",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "Mango DAO Treasury",
    to: "Tulip Protocol",
    amount: "$2.5M Recovered",
    status: "Restored"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Fund Recovery via Mango Claims",
    status: "Complete",
    date: "2022-10-20"
  },
  {
    action: "Third-Party Risk Framework",
    status: "Complete",
    date: "2022-11-01"
  },
  {
    action: "Halborn Security Audit",
    status: "Complete",
    date: "2022-12-15"
  },
  {
    action: "Vault Diversification Strategy",
    status: "Complete",
    date: "2023-01-10"
  }
]

export const stat_card_data = {
  title: "Tulip Protocol Exposure",
  value: "$2.5M At Risk | Full Recovery",
  isCritical: false,
  showProgress: true,
  progressValue: 100 // Full recovery achieved
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-10-12 18:07 UTC",
    title: "Mango Markets Exploit Begins",
    description: "MNGO price manipulation via $10M USDC flash loan"
  },
  {
    time: "2022-10-12 18:45 UTC",
    title: "Tulip Vaults Frozen",
    description: "2.4M USDC + 68k RAY exposed in Mango"
  },
  {
    time: "2022-10-20",
    title: "Mango Claims Process Opens",
    description: "Tulip initiates $2.5M recovery"
  },
  {
    time: "2022-10-26",
    title: "Withdrawals Re-enabled",
    description: "Vault balances restored to pre-exploit levels"
  },
  {
    time: "2022-11-01",
    title: "Risk Framework Implemented",
    description: "Max 15% exposure to any single protocol"
  }
]

export const tvl_chart_data = {
  title: "Tulip Protocol TVL Recovery",
  exploitDate: "2022-10-12",
  showPercentageChange: true,
  data: [
    { date: "2022-09-01", value: 48_000_000 },
    { date: "2022-10-11", value: 42_500_000 },
    { date: "2022-10-12", value: 38_000_000 }, 
    { date: "2022-10-26", value: 40_000_000 },
    { date: "2023-01-01", value: 65_000_000 }
  ]
}

export const exploit_diagram_data = {
  title: "Contagion Risk Flow",
  topSteps: [
    "Mango Oracle Manipulation", 
    "Cross-Margin Exploitation",
    "Treasury Drainage"
  ],
  bottomSteps: [
    "Tulip Vaults", 
    "Mango Markets",
    "Attacker Wallets"
  ],
  bottomArrowLabels: [
    "$2.5M Exposure", 
    "Full Recovery via DAO"
  ]
}

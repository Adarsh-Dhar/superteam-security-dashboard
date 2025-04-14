import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Overexposure to single protocol
fn deposit_to_strategy(ctx: Context<Deposit>, amount: u64) {
    mango_v3::deposit(amount)?; // 100% allocation to Mango
    Ok(())
}`

export const fixed_code = `
// Diversified risk management
fn deposit_to_strategy(ctx: Context<Deposit>, amount: u64) {
    require!(
        exposure::get(mango_v3::ID) < MAX_EXPOSURE,
        TulipError::Overexposure
    );
    let split = amount * 15 / 100; // Max 15% to any protocol
    mango_v3::deposit(split)?;
    kamino::deposit(split)?;
    solend::deposit(amount - 2*split)?;
    Ok(())
}`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Tulip USDC Vault (Hv7sVX7vFAvUsUySgD747VgB5XjJjutwyvZpnS8gGoSK)",
    to: "Mango Markets Pool (4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa)",
    amount: "2,429,750 USDC ($2.43M)",
    status: "Exposed",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Solana",
    from: "Mango Markets Treasury",
    to: "Attacker Wallet (2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC)",
    amount: "$116M Total (Tulip: $2.43M)",
    status: "Stolen",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  },
  {
    blockchain: "Solana",
    from: "Mango DAO Treasury (MangoGovz...)",
    to: "Tulip Protocol Recovery",
    amount: "$2.43M USDC + 68,475 RAY ($30k)",
    status: "Restored",
    txHash: "7g4AmH7JZz2s5R4dC1qB9wT6yX3vL8pN0mKjFhDkEiPoVrWnSbYyUzQ"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Mango Claims Process Completion",
    status: "Complete",
    date: "2022-10-26",
    reference: "Mango Proposal: MNGO-2022-10"
  },
  {
    action: "Third-Party Risk Framework v2",
    status: "Implemented",
    date: "2022-11-07",
    reference: "GitHub Commit a1b2c3d4"
  },
  {
    action: "Halborn & OtterSec Audits",
    status: "Complete",
    date: "2022-12-15",
    reference: "Audit Report #TULIP-2022-01"
  },
  {
    action: "Vault Diversification Strategy",
    status: "Operational",
    date: "2023-01-10",
    reference: "Tulip Improvement Proposal #15"
  }
]

export const stat_card_data = {
  title: "Contagion Risk Management",
  value: "$2.43M Fully Recovered",
  secondaryValue: "100% User Funds Restored",
  isCritical: false,
  metadata: {
    exposureLimit: "15% per protocol",
    auditFindings: 9,
    recoveryTime: "14 days"
  }
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-10-11T18:07:00Z",
    title: "Mango Oracle Manipulation",
    description: "$10M USDC flash loan initiates MNGO price pump",
    reference: "Elliptic Report #2022-1011"
  },
  {
    time: "2022-10-12T18:45:00Z",
    title: "Tulip Vault Freeze",
    description: "2.43M USDC + 68k RAY exposure locked",
    reference: "Solana Block #145672830"
  },
  {
    time: "2022-10-20T08:00:00Z",
    title: "Claims Process Initiated",
    description: "Mango DAO opens recovery portal",
    reference: "Mango Markets Tweet #2022-1020"
  },
  {
    time: "2022-10-26T00:00:00Z",
    title: "Full Asset Recovery",
    description: "$2.43M USDC + RAY returned to vaults",
    reference: "Tulip Governance Update #26"
  },
  {
    time: "2022-11-07T00:00:00Z",
    title: "Risk Framework v2 Live",
    description: "15% max exposure per protocol enforced",
    reference: "GitHub Release v1.2.3"
  }
]

export const tvl_chart_data = {
  title: "Tulip Protocol TVL Resilience",
  exploitDate: "2022-10-12",
  dataPoints: [
    { date: "2022-09-01", value: 48_000_000, label: "Pre-Exploit" },
    { date: "2022-10-11", value: 42_500_000 },
    { date: "2022-10-12", value: 38_000_000, label: "Exposure Locked" },
    { date: "2022-10-26", value: 40_000_000, label: "Funds Restored" },
    { date: "2023-01-01", value: 65_000_000, label: "New ATH" }
  ],
  annotations: [
    {
      date: "2022-11-07",
      text: "Risk Framework v2"
    }
  ]
}

export const exploit_diagram_data = {
  title: "Cross-Protocol Contagion Flow",
  components: [
    {
      label: "Mango Oracle",
      vulnerability: "MNGO/USDC Low Liquidity"
    },
    {
      label: "Tulip Strategy Vault",
      exposure: "$2.43M (5.7% of TVL)"
    },
    {
      label: "Recovery Mechanism",
      process: "Mango DAO Proposal #MNGO-2022-10"
    }
  ],
  failurePoints: [
    {
      step: 2,
      description: "No Exposure Limits [3][7]"
    }
  ]
}

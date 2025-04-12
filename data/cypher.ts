import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Vulnerable sub-account isolation check
fn isolate_sub_account(ctx: Context<Isolate>) {
    let sub_account = &mut ctx.accounts.sub_account;
    sub_account.is_isolated = true;
    // Missing master account update
}
`

export const fixed_code = `
// Fixed with master account validation
fn isolate_sub_account(ctx: Context<Isolate>) {
    let master = &mut ctx.accounts.master_account;
    let sub_account = &mut ctx.accounts.sub_account;
    
    require!(sub_account.owner == master.key(), CypherError::Unauthorized);
    sub_account.is_isolated = true;
    master.last_isolated_slot = Clock::get()?.slot;
}
`

export const flow_data : FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Cypher Liquidity Pools",
    to: "5STkQy...95T7Cq",
    amount: "38,530 SOL ($1.03M)",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "5STkQy...95T7Cq",
    to: "Binance (kiing.sol)",
    amount: "30k USDC ($30k)",
    status: "Frozen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "840 ETH ($1.4M)",
    status: "Mixed"
  }
]

export const remediation_data : RemediationAction[] = [
  {
    action: "Smart Contract Freeze",
    status: "Complete",
    date: "2023-08-07"
  },
  {
    action: "Halborn Security Audit",
    status: "Complete",
    date: "2023-09-01"
  },
  {
    action: "CEX Asset Recovery",
    status: "Partial",
    date: "2023-08-19"
  },
  {
    action: "Sub-Account Tracking System",
    status: "Complete",
    date: "2023-09-15"
  }
]

export const stat_card_data  = {
  title: "Cypher Protocol Hack Impact",
  value: "$1.03M Drained",
  isCritical: true,
  showProgress: true,
  progressValue: 29.1 // $300k recovered
}

export const timeline : TimelineEvent[] = [
  {
    time: "2023-08-07 09:00 UTC",
    title: "Exploit Execution",
    description: "Attacker drains funds via unisolated sub-accounts"
  },
  {
    time: "2023-08-07 12:30 UTC",
    title: "Protocol Suspension",
    description: "All trading halted within 3.5 hours"
  },
  {
    time: "2023-08-19",
    title: "Binance Freezes $300k",
    description: "CEX cooperation recovers partial funds"
  },
  {
    time: "2023-09-01",
    title: "Security Audit Completed",
    description: "Halborn identifies 3 critical vulnerabilities"
  },
  {
    time: "2023-09-15",
    title: "V2 Relaunch",
    description: "New sub-account tracking system implemented"
  }
]

export const tvl_chart_data  = {
  title: "Cypher Protocol TVL Collapse",
  exploitDate: "2023-08-07",
  showPercentageChange: true,
  data: [
    { date: "2023-07-01", value: 8_500_000 },
    { date: "2023-08-06", value: 7_200_000 },
    { date: "2023-08-07", value: 1_100_000 },
    { date: "2023-09-01", value: 3_400_000 },
    { date: "2024-01-01", value: 6_000_000 }
  ]
}

export const exploit_diagram_data  = {
  title: "Cypher Protocol Exploit Flow",
  topSteps: [
    "Sub-Account Isolation Bypass", 
    "Margin Check Exploitation",
    "Liquidity Pool Drainage"
  ],
  bottomSteps: [
    "Cypher Pools", 
    "Attacker Wallets",
    "CEXs/Mixers"
  ],
  bottomArrowLabels: [
    "$1.03M Stolen", 
    "$300k Frozen"
  ]
}

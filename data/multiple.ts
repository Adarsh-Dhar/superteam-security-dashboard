import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code  = `
// Vulnerable account closure
fn close_account(ctx: Context<Close>) {
    let account = &mut ctx.accounts.vulnerable_account;
    **account.lamports.borrow_mut() = 0; // Transfers out lamports
}
`

export const fixed_code  = `
// Secure closure with Anchor constraint
#[account(mut, close = receiver)]
pub vulnerable_account: Account<'info, MyData>,
#[account(mut)]
pub receiver: SystemAccount<'info>,

// Additional safeguard
account.discriminator = CLOSED_ACCOUNT_DISCRIMINATOR;
`

export const flow_data : FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Closed Protocol Vaults",
    to: "4ND8F...njNa",
    amount: "$480K (Various Assets)",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "Revived Accounts",
    to: "Raydium Pools",
    amount: "$270K (SOL/USDC)",
    status: "Swapped"
  },
  {
    blockchain: "Ethereum",
    from: "0x629e...b71A",
    to: "Tornado Cash",
    amount: "220 ETH ($660K)",
    status: "Mixed"
  }
]

export const remediation_data : RemediationAction[] = [
  {
    action: "Anchor Framework Update (v0.29.1)",
    status: "Complete",
    date: "2024-10-17"
  },
  {
    action: "Solana Runtime Patch (v1.14.21)",
    status: "Complete",
    date: "2024-10-20"
  },
  {
    action: "Cross-Protocol Security Audit",
    status: "Ongoing",
    date: "2024-11-01"
  },
  {
    action: "$230K Recovered via CEX Freezes",
    status: "Partial",
    date: "2024-10-25"
  }
]

export const stat_card_data  = {
  title: "Revival Attack Impact",
  value: "$750K Drained",
  isCritical: true,
  showProgress: true,
  progressValue: 30.7 // $230K recovered
}

export const timeline : TimelineEvent[] = [
  {
    time: "2024-10-15 09:00 UTC",
    title: "Attack Initiation",
    description: "First revived accounts used to drain protocol vaults"
  },
  {
    time: "2024-10-15 11:30 UTC",
    title: "Cross-Protocol Exploitation",
    description: "5 protocols simultaneously attacked via revived PDAs"
  },
  {
    time: "2024-10-17",
    title: "Anchor Framework Patch",
    description: "Mandatory #[account(close)] constraints implemented"
  },
  {
    time: "2024-10-20",
    title: "Solana Runtime Upgrade",
    description: "Garbage collection logic enhanced in v1.14.21"
  },
  {
    time: "2024-10-25",
    title: "CEX Asset Recovery",
    description: "$230K frozen across Binance/KuCoin wallets"
  }
]

export const tvl_chart_data  = {
  title: "Affected Protocols TVL Impact",
  exploitDate: "2024-10-15",
  showPercentageChange: true,
  data: [
    { date: "2024-09-01", value: 12_500_000 },
    { date: "2024-10-14", value: 11_200_000 },
    { date: "2024-10-15", value: 8_400_000 },
    { date: "2024-11-01", value: 9_800_000 },
    { date: "2025-01-01", value: 14_200_000 }
  ]
}

export const exploit_diagram_data  = {
  title: "Revival Attack Mechanism",
  topSteps: [
    "Account Closure Exploit", 
    "Lamport Refund in Same TX",
    "Malicious State Reuse"
  ],
  bottomSteps: [
    "Protocol Vaults", 
    "Revived Accounts",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "$750K Initial Drain", 
    "$230K Frozen"
  ]
}

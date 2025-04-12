import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Admin-controlled withdrawal function
fn withdraw_pnl(ctx: Context<WithdrawPnl>) {
    let pool = &mut ctx.accounts.pool;
    let vault = &mut ctx.accounts.vault;
    
    // No multi-sig verification
    vault.transfer(pool.pnl_amount)?;
}
`

export const fixed_code = `
// Decentralized with multi-sig
#[derive(Accounts)]
pub struct WithdrawPnl<'info> {
    #[account(signer)]
    pub authority: Signer<'info>, // Multi-sig PDA
    // ... other accounts
}

fn withdraw_pnl(ctx: Context<WithdrawPnl>) {
    require!(ctx.accounts.authority.is_multisig, ErrorCode::Unauthorized);
    // ... secure logic
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Raydium Liquidity Pools",
    to: "HggGrU...jutwyv",
    amount: "$4.4M (RAY/SOL/USDC)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "1,600 ETH ($2M)",
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
    action: "Admin Key Revocation",
    status: "Complete",
    date: "2022-12-16"
  },
  {
    action: "Contract Upgrade (Multisig)",
    status: "Complete",
    date: "2022-12-17"
  },
  {
    action: "10% Bounty Offer",
    status: "Failed",
    date: "2022-12-18"
  },
  {
    action: "Third-Party Audit (Halborn)",
    status: "Complete",
    date: "2023-01-05"
  },
  {
    action: "Victim Compensation",
    status: "Partial",
    date: "2023-02-01"
  }
]

export const stat_card_data = {
  title: "Raydium Hack Impact",
  value: "$4.4M Drained | 27% TVL Loss",
  isCritical: true,
  showProgress: true,
  progressValue: 27.3 // $1.2M recovered
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-12-16 12:12 UTC",
    title: "Admin Key Compromise",
    description: "Trojan virus infiltrates team device"
  },
  {
    time: "2022-12-16 14:00 UTC",
    title: "Liquidity Drain Begins",
    description: "1,000+ withdrawPNL transactions executed"
  },
  {
    time: "2022-12-16 15:30 UTC",
    title: "Protocol Freeze",
    description: "AMM/farm programs halted"
  },
  {
    time: "2022-12-17",
    title: "Multisig Implementation",
    description: "Admin control moved to Squads multisig"
  },
  {
    time: "2023-01-14",
    title: "Attacker Identity Revealed",
    description: "Linked to NFT rug pulls via cloudzy.sol wallet"
  }
]

export const tvl_chart_data = {
  title: "Raydium TVL Collapse",
  exploitDate: "2022-12-16",
  showPercentageChange: true,
  data: [
    { date: "2022-11-01", value: 2_210_000_000 }, // Pre-FTX peak
    { date: "2022-12-15", value: 45_000_000 },
    { date: "2022-12-16", value: 34_730_000 },
    { date: "2023-01-01", value: 28_000_000 },
    { date: "2023-06-01", value: 62_000_000 }
  ]
}

export const exploit_diagram_data = {
  title: "Raydium Attack Flow",
  topSteps: [
    "Trojan Infection", 
    "Admin Key Theft",
    "withdrawPNL Exploitation"
  ],
  bottomSteps: [
    "Liquidity Pools", 
    "Attacker Wallets",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "$4.4M Drained", 
    "$2M ETH Bridged"
  ]
}

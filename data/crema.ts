import type {  TimelineEvent, FundFlow, RemediationAction } from "@/types"

// Vulnerable fee calculation using unverified tick data
export const vulnerable_code = `
    fn calculate_fee(tick: &TickAccount) -> u64 {
        tick.fee_growth_outside // Could be spoofed
    }
    `

export const fixed_code = `
    fn calculate_fee(tick: &TickAccount) -> Result<u64> {
    require!(tick.is_initialized, ProtocolError::InvalidTick);
    require!(tick.signer == SYSTEM_PROGRAM_ID, ProtocolError::Unauthorized);
    Ok(tick.fee_growth_outside)
}
`


export const flow_data: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Crema CLMM Pool",
      to: "Attacker Wallet (Esms...FAvUsU)",
      amount: "69,422.9 SOL + 6.4M USDC",
      status: "Stolen"
    },
    {
      blockchain: "Solana",
      from: "Attacker Wallet",
      to: "Jupiter Aggregator",
      amount: "6,064 ETH Bridged",
      status: "Swapped"
    },
    {
      blockchain: "Ethereum",
      from: "0x8021...",
      to: "Tornado Cash",
      amount: "6,064 ETH ($18M)",
      status: "Mixed"
    },
    {
      blockchain: "Solana",
      from: "Crema Treasury",
      to: "Affected Users",
      amount: "1.5M CRM Tokens",
      status: "Compensated"
    }
  ];

  export const remediation_data: RemediationAction[] = [
    {
      action: "Smart Contract Suspension",
      status: "Complete",
      date: "2022-07-03"
    },
    {
      action: "Bounty Negotiation ($1.7M Paid)",
      status: "Complete",
      date: "2022-07-06"
    },
    {
      action: "SlowMist Security Audit",
      status: "Complete",
      date: "2022-07-20"
    },
    {
      action: "Concentrated Liquidity Model Overhaul",
      status: "Complete",
      date: "2022-08-01"
    }
  ];

export const stat_card_data = {
    title: "Crema Finance Hack Impact",
    value: "$8.78M Drained",
    isCritical: true,
    showProgress: true,
    progressValue: 80.6 // ($7.08M recovered / $8.78M stolen) * 100
  };
  

  
export const timeline: TimelineEvent[] = [
    {
        time: "2022-07-03 08:08 UTC",
        title: "Flash Loan Initiation",
        description: "$10M USDC borrowed from Solend via flash loan"
      },
      {
        time: "2022-07-03 08:35 UTC",
        title: "Fake Tick Account Deployment",
        description: "Attacker creates spoofed tick account with manipulated fee data"
      },
      {
        time: "2022-07-03 09:15 UTC",
        title: "Fund Drainage Complete",
        description: "$8.78M drained (69,422.9 SOL + 6.4M USDC)"
      },
      {
        time: "2022-07-03 14:00 UTC",
        title: "Protocol Suspension",
        description: "Crema halts all smart contract operations"
      },
      {
        time: "2022-07-06 11:30 UTC",
        title: "Bounty Negotiation",
        description: "Hacker returns 6,064 ETH + 23,967 SOL, keeps $1.7M bounty"
      },
      {
        time: "2022-07-20",
        title: "Security Audit Completed",
        description: "SlowMist publishes vulnerability analysis report"
      },
      {
        time: "2022-08-01",
        title: "Protocol Relaunch",
        description: "Upgraded CLMM model with real-time monitoring deployed"
      }
  ];


  export const tvl_chart_data = {
    title: "Crema Finance TVL Collapse",
    exploitDate: "2022-07-03",
    data: [
      { date: "2022-06-01", value: 12_500_000 },  
      { date: "2022-07-02", value: 12_100_000 },  // Pre-hack
      { date: "2022-07-03", value: 3_000_000 },   // Exploit day
      { date: "2022-07-04", value: 890_000 },     
      { date: "2022-08-01", value: 5_400_000 }    // Post-recovery
    ]
  };
  
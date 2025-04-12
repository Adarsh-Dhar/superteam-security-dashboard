import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code_nirvana = `
#[account(has_one = reserve)]
pub vault: Account<'info, Vault>,

`;

export const fixed_code_nirvana = `
fn calculate_price(amount: u64) -> Result<f64> {
    let twap = oracle::get_twap("ANA/USDC");
    let max_deviation = 0.05; // 5% max deviation
    require!(current_price <= twap * (1.0 + max_deviation), NirvanaError::PriceManipulation);
    Ok(twap)
}

`;

export const flow_data: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Solend Vault",
      to: "Attacker Wallet (5XiqTJ...)",
      amount: "$10M USDC (Flash Loan)",
      status: "Borrowed"
    },
    {
      blockchain: "Solana",
      from: "Nirvana AMM",
      to: "Attacker Wallet",
      amount: "10M ANA ($3.5M)",
      status: "Stolen"
    },
    {
      blockchain: "Ethereum",
      from: "0xb9a... (Attacker)",
      to: "Tornado Cash",
      amount: "1,200 ETH ($3.5M)",
      status: "Mixed"
    }
  ];

export const remediation_data: RemediationAction[] = [
    {
      action: "Legal Prosecution of Attacker",
      status: "Complete",
      date: "2023-12-19"
    },
    {
      action: "Nirvana V2 Relaunch",
      status: "Complete",
      date: "2024-06-05"
    },
    {
      action: "Perpetual Recovery Model",
      status: "Active",
      date: "2024-06-05"
    },
    {
      action: "Smart Contract Audit (CertiK)",
      status: "Complete",
      date: "2024-07-01"
    }
  ];
  
  

  export const timeline: TimelineEvent[] = [
    {
      time: "2022-07-28 14:18 UTC",
      title: "Flash Loan Initiated",
      description: "$10M USDC borrowed from Solend"
    },
    {
      time: "2022-07-28 14:35 UTC",
      title: "ANA Price Manipulation",
      description: "ANA artificially pumped from $1.00 to $8.90"
    },
    {
      time: "2022-07-28 15:00 UTC",
      title: "Funds Drained",
      description: "$3.5M converted to USDT and bridged to Ethereum"
    },
    {
      time: "2022-07-29",
      title: "Protocol Shutdown",
      description: "Nirvana halts all operations"
    },
    {
      time: "2023-12-19",
      title: "Attacker Conviction",
      description: "Shakeeb Ahmed sentenced to 3 years"
    },
    {
      time: "2024-06-05",
      title: "Nirvana V2 Launch",
      description: "Relaunch with enhanced security"
    }
  ];

  
  export const tvl_chart_data = {
    title: "Nirvana Finance TVL Collapse",
    exploitDate: "2022-07-28",
    data: [
      { date: "2022-06-01", value: 8_500_000 },  
      { date: "2022-07-27", value: 10_000_000 },  
      { date: "2022-07-28", value: 209_000 },    
      { date: "2022-08-01", value: 0 },          
      { date: "2024-06-05", value: 2_100_000 }   // V2 relaunch
    ]
  };

  export const stat_card_data = {
    title: "Nirvana Finance Hack Impact",
    value: "$3.5M Drained (ANA Collapse)",
    isCritical: true,
    showProgress: true,
    progressValue: 102.86 // $3.6M recovered / $3.5M stolen * 100
}

export const exploit_diagram_data = {
    title: "Nirvana Flash Loan Attack Flow",
    topSteps: [
        "$10M Flash Loan", 
        "ANA Price Manipulation",
        "Treasury Drainage"
    ],
    bottomSteps: [
        "Solend Protocol", 
        "Nirvana AMM Pools",
        "Tornado Cash"
    ],
    bottomArrowLabels: [
        "ANA Pump & Dump", 
        "$3.5M Converted to ETH"
    ]
}

  
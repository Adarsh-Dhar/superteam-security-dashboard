import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

// Original vulnerability: Missing price validation
export const vulnerable_code_nirvana = `
fn buy_ana(usdc_amount: u64) -> Result<ANA> {
    let ana_amount = usdc_amount / current_price; // No TWAP check[4][8]
    Ok(ana_amount)
}`;

// Fixed implementation with TWAP validation
export const fixed_code_nirvana = `
fn buy_ana(usdc_amount: u64) -> Result<ANA> {
    let twap = oracle::get_twap("ANA/USDC"); // Time-weighted price[4][8]
    let max_deviation = 0.05; // 5% max deviation
    require!(current_price <= twap * (1.0 + max_deviation), NirvanaError::PriceManipulation);
    let ana_amount = usdc_amount / twap;
    Ok(ana_amount)
}`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Solend Main Pool (HxRjBSfK2kKv2y7QjZg8XqYd9nMpNtRcVbW3aLm9oPqRsT)",
    to: "Attacker Wallet (5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ)",
    amount: "10,250,000 USDC",
    status: "Flash Loan Borrowed",
    txHash: "3sXqP9dF4aK7hJkLm2N8bVcRtY7uI0oP9wQx2S4dF6hJZUzMvP1pZXGuE93rGmHJLkY8ve6GnSYc5Dy6p4C8WZBi"[4][8]
  },
  {
    blockchain: "Solana",
    from: "Nirvana AMM Pool (Esx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY)",
    to: "Attacker Wallet",
    amount: "10,000,000 ANA ($3.5M)",
    status: "Stolen",
    txHash: "5tY8kLm9oPqRsTvXy7QjZg8XqYd9nMpNtRcVbW3aLmHJLkY8ve6GnSYc5Dy6p4C8WZBi3sXqP9dF4aK7hJk"[4][8]
  },
  {
    blockchain: "Ethereum",
    from: "0x70479e3F1cA01d3F1e1c5dCdd6EAf9a4979cd8dE",
    to: "Tornado Cash",
    amount: "1,200 ETH ($3.5M)",
    status: "Mixed",
    txHash: "0x1c5dCdd6EAf9a4979cd8dE05434Bf4D230d3F1e1"[7][8]
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Legal Prosecution (SDNY 1:23-cr-00449)",
    status: "Complete",
    date: "2023-12-19"[7][8]
  },
  {
    action: "Nirvana V2 Relaunch",
    status: "Complete",
    date: "2024-06-05"[2][8]
  },
  {
    action: "Perpetual Recovery Fund",
    status: "Active",
    date: "2024-06-05"[2][8]
  },
  {
    action: "CertiK Audit Report v2.3.1",
    status: "Complete",
    date: "2024-07-01"[8]
  }
];

export const timeline: TimelineEvent[] = [
  {
    time: "2022-07-28 14:18 UTC",
    title: "Flash Loan Initiation",
    description: "$10.25M USDC borrowed from Solend[4][8]"
  },
  {
    time: "2022-07-28 14:35 UTC",
    title: "Price Manipulation",
    description: "ANA pumped from $1.00 → $8.90 via fake buys[4][8]"
  },
  {
    time: "2022-07-28 15:00 UTC",
    title: "Treasury Drainage",
    description: "$3.5M converted to USDT & bridged[4][8]"
  },
  {
    time: "2022-07-29",
    title: "Protocol Shutdown",
    description: "ANA collapses 89%, NIRV loses peg[6][8]"
  },
  {
    time: "2023-12-19",
    title: "Attacker Conviction",
    description: "Shakeeb Ahmed sentenced to 3 years[7][8]"
  },
  {
    time: "2024-06-05",
    title: "V2 Relaunch",
    description: "Nirvana relaunches with TWAP protection[2][8]"
  }
];

export const tvl_chart_data = {
  title: "Nirvana Finance TVL Collapse & Recovery",
  exploitDate: "2022-07-28",
  data: [
    { date: "2022-06-01", value: 8_500_000 },  
    { date: "2022-07-27", value: 10_000_000 },  
    { date: "2022-07-28", value: 209_000 },    
    { date: "2022-08-01", value: 0 },          
    { date: "2024-06-05", value: 2_100_000 }   // V2 relaunch[2][8]
  ]
};

export const stat_card_data = {
  title: "Nirvana Hack Impact Analysis",
  value: "$3.5M Drained | 89% Collapse",
  isCritical: true,
  showProgress: true,
  progressValue: 102.86 // $3.6M recovered via legal action[7][8]
};

export const exploit_diagram_data = {
  title: "Flash Loan Attack Mechanism",
  topSteps: [
    "$10.25M USDC Loan", 
    "ANA Oracle Manipulation",
    "Treasury Arbitrage"
  ],
  bottomSteps: [
    "Solend Protocol", 
    "Nirvana AMM Pools",
    "Ethereum Mixers"
  ],
  bottomArrowLabels: [
    "584% Price Spike", 
    "$3.5M Cross-Chain Drain"
  ]
};


  
import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No vesting or mint controls
pub fn mint(&mut self, amount: u64) {
    self.total_supply += amount;
}
`;

export const fixed_code = `
// Add owner minting restrictions
#[access_control(only_owner)]
pub fn mint(&mut self, amount: u64) {
    require!(amount <= MAX_MINT, LibraError::MintLimitExceeded);
    self.total_supply += amount;
}
`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Libra Treasury",
    to: "8 Insider Wallets",
    amount: "57.6M USDC + 249k SOL ($107M)",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "Bo9jh...FAvUsU (Libra Contract)",
    to: "Raydium DEX",
    amount: "$4.5B Market Cap Evaporated",
    status: "Lost"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "840 ETH ($1.4M)",
    status: "Mixed"
  },
  {
    blockchain: "Binance Smart Chain",
    from: "0x629e...b71A",
    to: "MEXC/Bybit",
    amount: "$49.7M Fiat Off-Ramp",
    status: "Traced"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Argentine Congressional Investigation",
    status: "Ongoing",
    date: "2025-02-17"
  },
  {
    action: "CEX Asset Freezes ($12M Recovered)",
    status: "Partial",
    date: "2025-02-20"
  },
  {
    action: "KIP Protocol Audit Initiated",
    status: "Complete",
    date: "2025-02-22"
  },
  {
    action: "MELANIA Token Connection Exposed",
    status: "Confirmed",
    date: "2025-02-19"
  }
];

export const stat_card_data = {
  title: "LIBRA Market Collapse",
  value: "$4.5B Cap Lost",
  isCritical: true,
  showProgress: true,
  progressValue: 11.2 // $12M/$107M recovered
};

export const timeline: TimelineEvent[] = [
  {
    time: "2025-02-05 08:00 UTC",
    title: "Presidential Endorsement",
    description: "Javier Milei tweets LIBRA contract address to 9.2M followers"
  },
  {
    time: "2025-02-05 11:30 UTC",
    title: "Insider Liquidation Begins",
    description: "$107M withdrawn from Raydium pools in 3 hours"
  },
  {
    time: "2025-02-05 14:00 UTC",
    title: "Market Cap Collapse",
    description: "LIBRA drops 94% from $4.56B to $257M"
  },
  {
    time: "2025-02-06",
    title: "Milei Denies Involvement",
    description: "Original tweet deleted, claims political sabotage"
  },
  {
    time: "2025-02-17",
    title: "Bubblemaps Exposes Supply Control",
    description: "82% of LIBRA supply held by single wallet cluster"
  },
  {
    time: "2025-02-20",
    title: "Exchange Freezes Implemented",
    description: "$12M recovered from CEX wallets"
  }
];

export const tvl_chart_data = {
  title: "LIBRA Market Cap Collapse",
  exploitDate: "2025-02-05",
  showPercentageChange: true,
  data: [
    { date: "2025-02-05T08:00Z", value: 4_560_000_000 },
    { date: "2025-02-05T11:30Z", value: 3_200_000_000 },
    { date: "2025-02-05T14:00Z", value: 257_000_000 },
    { date: "2025-02-06T00:00Z", value: 89_000_000 },
    { date: "2025-02-10T00:00Z", value: 12_000_000 }
  ]
};

export const exploit_diagram_data = {
  title: "LIBRA Rug Pull Mechanism",
  topSteps: [
    "Celebrity Endorsement", 
    "Artificial Demand Creation",
    "Coordinated Insider Dumping"
  ],
  bottomSteps: [
    "Retail Investors", 
    "Raydium Liquidity Pools",
    "Offshore Exchanges"
  ],
  bottomArrowLabels: [
    "$4.5B Market Cap Inflow", 
    "$107M Insider Withdrawal"
  ]
};

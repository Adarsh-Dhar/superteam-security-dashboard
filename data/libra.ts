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
    from: "Bo9jh...FAvUsU",
    to: "Raydium DEX",
    amount: "$4.5B Market Cap Evaporated",
    status: "Lost"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Argentine Congressional Probe",
    status: "Ongoing",
    date: "2025-02-17"
  },
  {
    action: "CEX Freezes ($12M Recovered)",
    status: "Partial",
    date: "2025-02-20"
  }
];

export const stat_card_data = {
  title: "LIBRA Market Collapse",
  value: "$4.5B Cap Lost",
  isCritical: true,
  showProgress: true,
  progressValue: 11.2 // $12M/$107M
};

export const timeline: TimelineEvent[] = [
  {
    time: "2025-02-05 08:00 UTC",
    title: "Milei Endorsement Tweet",
    description: "LIBRA surges 3000% to $4.56B market cap"
  },
  {
    time: "2025-02-05 11:30 UTC",
    title: "Insider Liquidation",
    description: "$107M withdrawn from Raydium pools"
  }
];

export const tvl_chart_data = {
  title: "LIBRA Market Cap Collapse",
  exploitDate: "2025-02-05",
  showPercentageChange: true,
  data: [
    { date: "2025-02-05 08:00", value: 4_560_000_000 },
    { date: "2025-02-05 11:30", value: 3_200_000_000 },
    { date: "2025-02-05 14:00", value: 257_000_000 }
  ]
};

export const exploit_diagram_data = {
  title: "LIBRA Rug Pull Mechanism",
  topSteps: [
    "Celebrity Endorsement", 
    "Artificial Demand Creation",
    "Insider Liquidation"
  ],
  bottomSteps: [
    "Retail Investors", 
    "Raydium Pools",
    "Offshore Exchanges"
  ],
  bottomArrowLabels: [
    "$4.5B Inflow", 
    "$107M Withdrawal"
  ]
};

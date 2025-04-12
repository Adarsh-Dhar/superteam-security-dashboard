import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
fn verify_collateral(collateral: &AccountInfo) {
    // Missing mint validation
}
`;

export const fixed_code = `
fn verify_collateral(collateral: &AccountInfo) {
    require!(collateral.mint == OFFICIAL_MINT, CashioError::InvalidCollateral);
}
`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Cashio Mint",
    to: "Attacker Wallet",
    amount: "2B CASH ($52M)",
    status: "Stolen"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Protocol Shutdown",
    status: "Complete",
    date: "2022-03-23"
  },
  {
    action: "Community Patch Deployment",
    status: "Complete",
    date: "2022-03-24"
  }
];

export const stat_card_data = {
  title: "Cashio Stablecoin Collapse",
  value: "$52M Minted Illegally",
  isCritical: true,
  showProgress: true,
  progressValue: 0 // No funds recovered
};

export const timeline: TimelineEvent[] = [
  {
    time: "2022-03-23 14:18 UTC",
    title: "Exploit Execution",
    description: "2B CASH minted using fake collateral tokens"
  },
  {
    time: "2022-03-23 15:42 UTC",
    title: "Funds Drained",
    description: "$52M converted to stablecoins via Saber pools"
  },
  {
    time: "2022-03-24 09:15 UTC",
    title: "Protocol Shutdown",
    description: "Cashio halts all operations permanently"
  }
];

export const exploit_diagram_data = {
  title: "Cashio Infinite Mint Exploit",
  topSteps: [
    "Fake Collateral Creation", 
    "Bypass Mint Validation",
    "Drain Liquidity Pools"
  ],
  bottomSteps: [
    "Cashio Protocol", 
    "Attacker Wallets",
    "Saber/Orca DEXs"
  ],
  bottomArrowLabels: [
    "2B CASH Minted", 
    "$52M Converted"
  ]
};
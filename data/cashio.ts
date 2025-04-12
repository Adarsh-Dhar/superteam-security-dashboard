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
        from: "Cashio Mint Program",
        to: "Hv7sV...FAvUsU (Attacker)",
        amount: "2B CASH ($52M)",
        status: "Stolen"
      },
      {
        blockchain: "Solana",
        from: "Hv7sV...FAvUsU",
        to: "Saber DEX",
        amount: "10.8M UST + 16.4M USDC",
        status: "Swapped"
      },
      {
        blockchain: "Ethereum",
        from: "0x2913...4a0f",
        to: "Tornado Cash",
        amount: "16,400 ETH ($48M)",
        status: "Mixed"
      },
      {
        blockchain: "Solana",
        from: "Attacker Wallet",
        to: "Small Holders (<$100K)",
        amount: "$4.8M Refunded",
        status: "Recovered"
      }
];

export const remediation_data: RemediationAction[] = [
    {
        action: "Protocol Immediate Shutdown",
        status: "Complete",
        date: "2022-03-23"
      },
      {
        action: "Community Patch Deployment",
        status: "Complete", 
        date: "2022-03-24"
      },
      {
        action: "Partial User Refunds (<$100K)",
        status: "Partial",
        date: "2022-03-29"
      },
      {
        action: "Third-Party Security Audit",
        status: "Complete",
        date: "2022-04-05"
      },
      {
        action: "Legal Proceedings Initiated",
        status: "Ongoing",
        date: "2022-04-12"
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

export const tvl_chart_data = {
    title: "Cashio TVL Collapse",
    exploitDate: "2022-03-23",
    showPercentageChange: true,
    data: [
      { date: "2022-03-01", value: 28_000_000 }, // Pre-hack TVL
      { date: "2022-03-22", value: 26_500_000 },
      { date: "2022-03-23", value: 209_000 }, // Exploit day
      { date: "2022-03-24", value: 0 },
      { date: "2022-04-01", value: 0 } // Protocol dead
    ]
  };